import { Message, RichEmbed } from "discord.js";
import { Command, CommandInArray } from "../types";
import { commandsArray } from "../index";

// * Load environment variables
import "../../lib/env";

const COMMAND_PREFIX: string = process.env.COMMAND_PREFIX!;

const HelpCommand: Command = {
  name: "help",
  aliases: ["h", "aide"],
  usage: "[nomDeCommande]",
  description: "Affiche la description d'une ou plusieurs commandes",
  onlyStaff: false,
  run: (message: Message) => {
    const embed: RichEmbed = new RichEmbed()
      .setTitle("Aide aux commandes")
      .setColor("GOLD");

    const params = message.content.split(" ");
    params.shift();

    if (!params.length) {
      const commands = commandsArray.filter(
        (x: CommandInArray) => x.alias === x.command.name
      );

      if (commands) {
        commands.forEach((param: CommandInArray) => {
          embed.addField(
            `${COMMAND_PREFIX}${param.alias} ${param.command.usage}`,
            param.command.description
          );
        });

        message.channel.send(embed);
      }
    } else {
      params.forEach((param: string) => {
        const commandFound = commandsArray.find(
          (x: CommandInArray) => x.alias === param
        );

        if (commandFound) {
          embed.addField(
            `${COMMAND_PREFIX}${param} ${commandFound.command.usage}`,
            commandFound.command.description
          );

          message.channel.send(embed);
        }
      });
    }
  }
};

export default HelpCommand;
