import {
  Channel,
  Collection,
  Emoji,
  Guild,
  GuildChannel,
  GuildMember,
  Message,
  MessageReaction,
  Permissions,
  ReactionEmoji,
  RichEmbed,
  Role,
  TextChannel,
  User
} from "discord.js";
import moment from "moment";
import { Command, GuildOA, GuildInArray, GuildJoinRequest } from "../types";
import { saveGuildFile, UnicodeReactMap } from "../../utils/commandUtils";
import { guildsSave } from "../index";

const minSeniority: number = moment().diff(moment().subtract("1", "d"));
const roleShouldCheckGuild = "Staff";

const createChannel = (
  server: Guild,
  guildName: string,
  memberRole: Role,
  leaderRole: Role
) => {
  server
    .createChannel(guildName, {
      type: "category",
      permissionOverwrites: [
        {
          id: memberRole.id,
          allow: [Permissions.DEFAULT, Permissions.FLAGS.ADD_REACTIONS!],
          deny: [Permissions.FLAGS.MANAGE_MESSAGES!]
        },
        {
          id: leaderRole.id,
          allow: [Permissions.FLAGS.MANAGE_MESSAGES!, Permissions.DEFAULT]
        },
        {
          id: server.id,
          deny: [Permissions.ALL]
        }
      ]
    })
    .then(category => {
      category.guild.createChannel("quartier-general", {
        type: "text",
        parent: category.id,
        permissionOverwrites: [
          {
            id: leaderRole.id,
            allow: [Permissions.DEFAULT, Permissions.FLAGS.MANAGE_MESSAGES!]
          },
          {
            id: memberRole.id,
            deny: [Permissions.FLAGS.SEND_MESSAGES!],
            allow: [
              Permissions.FLAGS.READ_MESSAGES!,
              Permissions.FLAGS.ADD_REACTIONS!,
              Permissions.FLAGS.READ_MESSAGE_HISTORY!
            ]
          },
          {
            id: category.guild.id,
            deny: [Permissions.ALL]
          }
        ]
      });
      category.guild.createChannel("salle-commune", {
        type: "text",
        parent: category.id
      });
    })
    .catch(console.error);
};

const createChannelsAndRoles = (server: Guild, guild: GuildOA) => {
  server
    .createRole({
      name: guild.name,
      mentionable: true,
      position: 6
    })
    .then(memberRole => {
      server
        .createRole({
          name: `${guild.name}💎`,
          mentionable: true,
          position: 5
        })
        .then(leaderRole => {
          const leaderId = server.members.find(
            (user: GuildMember) => user.user.tag === guild.master
          );
          server.member(leaderId).addRole(leaderRole);
          server.member(leaderId).addRole(memberRole);

          createChannel(server, guild.name, memberRole, leaderRole);
        })
        .catch(console.error);
    })
    .catch(console.error);
};

const sendGuildStaffValidation = (msg: Message, guild: GuildOA) => {
  const embed: RichEmbed = new RichEmbed();

  const leader = msg.guild.members.find(
    member => member.user.tag === guild.master
  );
  if (guild.valid) {
    embed.setColor("GREEN").setTitle(`Création de la guilde ${guild.name}`);

    checkGuildValidation(msg.guild, guild);
  } else {
    embed
      .setColor("RED")
      .setTitle(`Refus à la création de la guilde ${guild.name}`);
  }

  // saveGuildFile();
  msg.channel.send(embed).then(msgSend => {
    if (guild.valid)
      msg.channel.send(
        `Félicitation ${leader} !Les membres du staff ont validé la création de ${guild.name}. Maintenant il faut que tout les membres aient rejoins !`
      );
    else
      msg.channel.send(
        `Dommage ${leader} :/ Le staff a refusé la création de ${guild.name} tu devrais voir avec eux`
      );
  });
};

const checkGuildValidation = async (server: Guild, guild: GuildOA) => {
  try {
    if (
      guild.valid &&
      guild.applicantsList.filter(x => !x.response).length === 0
    ) {
      await createChannelsAndRoles(server, guild);
      console.log(server.channels);
      const chanQG = server.channels.find((chan: Channel) => {
        console.log(chan instanceof TextChannel);
        if (chan instanceof TextChannel) {
          console.log(chan.parent);
          console.log(chan.parentID);
          if (chan.parent) console.log(chan.parent.name);
          console.log(chan.name);
        }

        return (
          chan instanceof TextChannel &&
          chan.parent &&
          chan.parent.name === guild.name &&
          chan.name === "quartier-general"
        );
      }) as TextChannel;
      const guildTag = server.roles.find("name", guild.name);

      chanQG.send(
        `Félicitation à vous ! ${guildTag} est une guilde officielle !`
      );

      guildsSave.push({ alias: guild.name, guild });
    }
  } catch (e) {
    console.error(e);
  }
};

const getResponse = (
  msg: Message,
  guild: GuildOA,
  member: User,
  server: Guild
) => {
  // TODO - Refac, should add in commandUtils a function to add reacts
  const filter = (reaction: MessageReaction) =>
    [UnicodeReactMap.confirmReact, UnicodeReactMap.cancelReact].includes(
      reaction.emoji.name
    );
  msg
    .awaitReactions(filter, { maxUsers: 2 })
    .then((collected: Collection<string, MessageReaction>) => {
      // Allow to get only the selected one by the user

      const awnser = collected.find("count", 2).emoji.name;
      msg.reactions.forEach((react: MessageReaction) => react.remove());

      const guildInvitation: GuildJoinRequest = guild.applicantsList.find(
        (user: GuildJoinRequest) => user.applicant === member.tag
      )!;
      guildInvitation.responseDate = moment().toDate();

      if (awnser === UnicodeReactMap.confirmReact) {
        member.send(
          `Bienvenue dans la guilde ${guild.name}, ${guild.master} t'accueilleras convenablement`
        );
        guildInvitation.response = true;
        guild.members.push(member.tag);

        checkGuildValidation(server, guild);
      } else {
        member.send(`Dommage pour ${guild.name}!`);
        guildInvitation.response = false;
      }
      // saveGuildFile();
    })
    .catch(console.error);
};

const getStaffConfirmation = (msg: Message, guild: GuildOA) => {
  msg
    .react(UnicodeReactMap.confirmReact)
    .then(() => msg.react(UnicodeReactMap.cancelReact));
  const filter = (messageReaction: MessageReaction, user: User) => {
    const beStaff =
      msg.guild
        .member(user)
        .roles.find((role: Role) => role.name === roleShouldCheckGuild) !==
      null;
    return (
      [UnicodeReactMap.confirmReact, UnicodeReactMap.cancelReact].includes(
        messageReaction.emoji.name
      ) && beStaff
    );
  };

  msg
    .awaitReactions(filter, { maxUsers: 1 })
    .then((collected: Collection<string, MessageReaction>) => {
      const awnser = collected.find("count", 2).emoji.name;
      msg.reactions.forEach((react: MessageReaction) => react.remove());

      guild.valid = awnser === UnicodeReactMap.confirmReact;

      sendGuildStaffValidation(msg, guild);
    })
    .catch(console.error);
};

const sendRequests = (message: Message, guild: GuildOA) => {
  const textToSend = new RichEmbed()
    .setColor("GOLD")
    .setTitle(
      `Invitation au sein de la guilde ${guild.name} par ${message.author.username}`
    )
    .addField(
      "Accepter ?",
      `${UnicodeReactMap.confirmReact} accepter ${UnicodeReactMap.cancelReact} refuser`
    );

  message.mentions.users.map(member => {
    const guildInvitation: GuildJoinRequest = {
      applicant: member.tag,
      limitDate: moment()
        .add("3", "d")
        .toDate(),
      response: null,
      responseDate: null
    };

    guild.applicantsList.push(guildInvitation);

    member
      .send(textToSend)
      .then((msg: Message | Message[]) => {
        if (msg instanceof Message) {
          msg
            .react(UnicodeReactMap.confirmReact)
            .then(() => msg.react(UnicodeReactMap.cancelReact));
          getResponse(msg, guild, member, message.guild);
        }
      })
      .catch(e => {
        console.error(e);
      });
  });
};

const createGuildCommand: Command = {
  aliases: ["cg", "create_guild"],
  description:
    "Permet de créer une guilde et d'envoyer une demande aux membres",
  name: "createGuild",
  onlyStaff: false,
  usage:
    "nom de guilde**,** @membre1 @membre2 @membre3 @membre4 @membre5 [@membre6...]",
  async run(message: Message) {
    const staffRole = message.guild.roles.find(
      role => role.name === roleShouldCheckGuild
    );

    const embed: RichEmbed = new RichEmbed()
      .setTitle("Création de guilde")
      .setColor("GOLD")
      .setFooter(message.author.tag, message.author.avatarURL);

    let params: Array<string> = [];
    let guild: GuildOA | null = null;

    if (!message.content.includes(", ")) {
      embed
        .setColor("RED")
        .addField(
          "Faites attention !",
          `Vous avez pensé à bien mettre une virgule et un espace après celui-ci ?\n${this.usage}`
        );
    } else {
      params = message.content.split(", ");
      const guildName: string = params
        .shift()!
        .split(" ")
        .splice(1)
        .toString()
        .replace(",", " ")
        .trim();
      params[0] = params[0].trim();
      params = params[0].split(" ");

      if (!params.length || params.length < 5) {
        embed
          .setColor("RED")
          .addField(
            "Veuillez vérifier vos paramètres, une erreur est si vite arrivée",
            this.usage
          );
      } else if (moment().diff(message.member.joinedAt) < minSeniority) {
        embed
          .setColor("RED")
          .addField(
            "Vous êtes arrivé depuis trop peu de temp!",
            "Prennez le temps de découvrir petit monde avant de créer le votre <:mccree:453138086919143424>"
          );
      } else if (!guildsSave.find((x: GuildInArray) => x.alias === guildName)) {
        guild = {
          applicantsList: [],
          master: message.author.tag,
          members: [message.author.tag],
          money: 0,
          name: guildName,
          valid: false,
          validatedByStaff: false
        };

        try {
          await sendRequests(message, guild);
          let applicantsString = "";
          guild.applicantsList.forEach(
            value => (applicantsString += `${value.applicant}\n`)
          );
          if (applicantsString === "")
            applicantsString = "C'est pas sérieux de faire ça :eyes:";

          embed
            .setTitle(`Création de la guilde ${guildName}`)
            .addField("Leader", guild.master)
            .addField("Membre", applicantsString);
        } catch (e) {
          console.error(e);
        }
      } else {
        embed.setColor("RED").addField(
          "C'est dommage !",
          `Quelqu'un a déjà eu l'idée de ce nom !
                  En même temps ${guildName} est un sacré nom <:mccree:453138086919143424>`
        );
        message.channel.send();
      }
    }

    if (guild !== null) {
      message.channel
        .send(embed)
        .then((msg: Message | Message[]) => {
          message.channel.send(
            `${staffRole} merci de valider(ou pas) cette demande de création.`
          );
          if (msg instanceof Message) {
            getStaffConfirmation(msg, guild!);
          }
        })
        .catch(console.error);
    } else {
      message.channel.send(embed);
    }
  }
};

export default createGuildCommand;
