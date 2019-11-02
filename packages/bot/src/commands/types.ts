import { Message } from "discord.js";

export interface Command {
  name: string;
  aliases: string[];
  description: string;
  onlyStaff: boolean;
  run(message: Message): void;
}

export interface CommandInArray {
  alias: string;
  command: Command;
}
