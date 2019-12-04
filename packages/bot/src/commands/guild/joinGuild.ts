import {
  Channel,
  Collection,
  Guild,
  Message,
  MessageReaction,
  RichEmbed,
  TextChannel,
  User
} from "discord.js";
import moment from "moment";
import { Command, GuildInArray, GuildJoinRequest, GuildOA } from "../types";
import { guildsSave } from "../index";
import { saveGuildFile, UnicodeReactMap } from "../../utils/commandUtils";
import { maxMembersInGuild } from "./createGuild";

const sendMasterRequest = (
  masterUser: User,
  requestUser: User,
  presentationMessage: string,
  guild: GuildOA,
  server: Guild
) => {
  const request: GuildJoinRequest = {
    applicant: "",
    limitDate: null,
    response: null,
    responseDate: null
  };

  const embed: RichEmbed = new RichEmbed()
    .setTitle("Requête pour rejoindre la guilde !")
    .setColor("GREEN")
    .addField(
      `Apparemment ${requestUser.tag} veut rejoindre la guilde. Voici son petit message`,
      `${presentationMessage}`
    )
    .addField(
      "On l'ajoute à la guilde ?",
      `${UnicodeReactMap.confirmReact}oui ${UnicodeReactMap.cancelReact}non`
    );

  masterUser.send(embed).then(msg => {
    if (msg instanceof Message) {
      msg
        .react(UnicodeReactMap.confirmReact)
        .then(() => msg.react(UnicodeReactMap.cancelReact));

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

          request.responseDate = moment().toDate();

          if (awnser === UnicodeReactMap.confirmReact) {
            requestUser.send(
              `Bienvenue dans la guilde ${guild.name}, ${guild.master} t'accueilleras convenablement`
            );
            request.response = true;
            guild.members.push(requestUser.tag);
            server
              .member(requestUser)
              .addRole(server.roles.find(x => x.name === guild.name))
              .then(x => {
                const chanQG = server.channels.find((chan: Channel) => {
                  return (
                    chan instanceof TextChannel &&
                    chan.parent &&
                    chan.parent.name === guild.name &&
                    chan.name === "quartier-general"
                  );
                }) as TextChannel;

                chanQG.send(
                  `Souhaitez donc la bienvenue à ${requestUser} chez ${guild.name} !`
                );
              });
          } else {
            requestUser.send(
              `${guild.name} a refusé ta demande, essaye de voir pourquoi ?`
            );
            request.response = false;
          }
          saveGuildFile();
        });
    }
  });
};

const beInGuild = (userTag: string): boolean => {
  return guildsSave.some(member => member.guild.members.includes(userTag));
};

const JoinGuildCommand: Command = {
  aliases: ["jg"],
  description:
    "Permet de rejoindre une guilde et d'envoyer une demande au chef.fe",
  name: "joinGuild",
  onlyStaff: false,
  usage: "nom de guilde, message de présentation",
  run: (message: Message) => {
    const embed: RichEmbed = new RichEmbed().setTitle(
      "Demande pour rejoindre la guilde"
    );

    const params: Array<string> = message.content.trim().split(", ");

    if (beInGuild(message.author.tag)) {
      embed
        .setColor("RED")
        .addField(
          "*Tousse* !",
          "J'ai vraiment besoin de le dire ?\nTu ne peut pas rejoindre deux guilde !"
        );
    } else if (params.length === 2) {
      const guildName: string = params
        .shift()!
        .split(" ")
        .slice(1)
        .join(" ");
      const presentationMessage: string = params[0];

      const guildInArray: GuildInArray | undefined = guildsSave.find(
        x => x.alias.toLowerCase() === guildName.toLowerCase()
      );

      if (guildInArray) {
        const { guild } = guildInArray;
        const masterUser = message.guild.members.find(
          x => x.user.tag === guild.master
        ).user;
        const requestUser = message.author;

        if(guild.members.length === maxMembersInGuild){
          embed
            .setColor("RED")
            .addField("Dommage !", `${guildName} a atteind la limite de ${maxMembersInGuild} membres`);
        }
        else if (!guild.members.includes(requestUser.tag)) {
          sendMasterRequest(
            masterUser,
            requestUser,
            presentationMessage,
            guild,
            message.guild
          );
          embed
            .setColor("GREEN")
            .addField("Requête envoyée", "Plus qu'à attendre la réponse ! :D");
        } else {
          embed
            .setColor("RED")
            .addField("*Juge* !", "J'ai vraiment besoin de le dire ?");
        }
      } else {
        embed
          .setColor("RED")
          .addField("Presque !", "Aucune guilde ne porte ce nom :/");
      }
    } else {
      embed
        .setColor("RED")
        .addField(
          "Presque !",
          "Faites attention à ajouter la virgule ou mettre votre message"
        );
    }
    message.channel.send(embed);
  }
};

export default JoinGuildCommand;
