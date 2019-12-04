import { Message, RichEmbed } from "discord.js";
import { Command } from "../types";
import { guildsSave } from "../index";

const ShowGuildCommand: Command = {
  aliases: ["sg"],
  description: "Permet d'afficher la listes des guildes'",
  name: "showGuild",
  onlyStaff: false,
  usage: "",
  run: (message: Message) => {
    const embed = new RichEmbed()
      .setColor("GOLD")
      .setTitle("Liste des guildes");
    let guildListString = "";

    guildsSave.map(guildInArray => {
      const { guild } = guildInArray;
      guildListString += ` - ${guild.name} sous la direction de ${guild.master} avec ${guild.members.length} membres\n`;
    });

    if (guildListString === "") {
      embed
        .setColor("RED")
        .addField(
          "Il est trop tôt !",
          'Il n\'y a pas encore de guilde ! Créée la avec "!create_guild" !'
        );
    } else {
      embed.addField("Résultat", guildListString);
    }

    message.channel.send(embed);
  }
};

export default ShowGuildCommand;
