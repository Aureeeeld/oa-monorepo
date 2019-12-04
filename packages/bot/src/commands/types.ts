import { Message, User } from "discord.js";

export interface Command {
  name: string;
  aliases: string[];
  usage: string;
  description: string;
  onlyStaff: boolean;
  run(message: Message): void;
}

export interface CommandInArray {
  alias: string;
  command: Command;
}

export interface GuildJoinRequest {
  applicant: string;
  limitDate: Date | null;
  responseDate: Date | null;
  response: boolean | null;
}

export interface GuildOA {
  name: string;
  master: string;
  members: string[];
  applicantsList: GuildJoinRequest[];
  validatedByStaff: boolean | null;
  valid: boolean | null;
  money: number;
}

export interface GuildInArray {
  alias: string;
  guild: GuildOA;
}
