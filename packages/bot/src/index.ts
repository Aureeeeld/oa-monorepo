// * Packages
import "reflect-metadata";
import { Discord, On, Client } from "@typeit/discord";
import { Message } from "discord.js";

// * Load environment variables
import "./lib/env";

const token: string = process.env.TOKEN!;

// * Discord Bot
@Discord
export default class DiscordApp {
  private static _client: Client;

  private _prefix = "!";

  private _sayHelloMessage = "hello !";

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
        switch (cmd) {
          case "hello":
            message.reply(this._sayHelloMessage);
            break;
          default:
            message.reply(this._commandNotFoundMessage);
            break;
        }
      }
    }
  }
}

// * Start
DiscordApp.start();
