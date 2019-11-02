import { Message } from "discord.js";
import { Command } from "../types";

const HelpCommand: Command = {
  name: "help",
  aliases: ["help", "h", "aide"],
  description: "",
  onlyStaff: false,
  run: (message: Message) => {
    message.reply("HELP");
  }
};

export default HelpCommand;
