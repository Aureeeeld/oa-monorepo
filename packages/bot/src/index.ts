// * Packages
import "reflect-metadata";
import { Discord, On, Client } from "@typeit/discord";
import { Message } from "discord.js";

// * Commands
import { initCommandsArray } from "./utils/commandUtils";
import { CommandInArray } from "./commands/types";
import { commandsArray } from "./commands";

// * Load environment variables
import "./lib/env";

const token: string = process.env.TOKEN!;

// * Discord Bot
@Discord
export default class DiscordApp {
  private static _client: Client;

  private _prefix = "!";

  private _commandNotFoundMessage = "command not found...";

  static start() {
    this._client = new Client();
    this._client.login(token, `${__dirname}/*Discord.ts`);
  }

  @On("message")
  async onMessage(message: Message) {
    if (DiscordApp._client.user.id !== message.author.id) {
      if (message.content[0] === this._prefix) {
        const cmd = message.content.replace(this._prefix, "").toLowerCase();
        const alias = cmd.split(" ")[0];

        const commandFound = commandsArray.find(
          (x: CommandInArray) => x.alias === alias
        );

        if (commandFound) commandFound.command.run(message);
      }
    }
  }
}

// * Start
initCommandsArray();
DiscordApp.start();
