import fs from "fs";
import recursive from "recursive-readdir";

import { commandsArray, guildsSave } from "../commands";
import {
  Command,
  CommandInArray,
  GuildOA,
  GuildInArray
} from "../commands/types";

const pathToCommands: string = fs.realpathSync("src/commands/");
const pathToGuildSaveFile: string = fs.realpathSync(
  "src/save_files/guild.json"
);

function isCommand(object: any): object is Command {
  return (
    "name" in object &&
    "aliases" in object &&
    "description" in object &&
    "usage" in object &&
    "onlyStaff" in object &&
    "run" in object
  );
}

const importCommand = (command: Command) => {
  const { aliases } = command;

  aliases.forEach((alias: string) => {
    const commandInArray: CommandInArray = {
      alias,
      command
    };

    commandsArray.push(commandInArray);
  });

  const commandInArray: CommandInArray = {
    alias: command.name,
    command
  };

  commandsArray.push(commandInArray);
};

const importCommandFromFile = (file: string) => {
  import(file).then(obj => {
    const def = obj.default;
    if (def) {
      if (isCommand(def)) importCommand(def);
    }
  });
};

const initCommandsArray = () => {
  recursive(
    pathToCommands,
    async (err: NodeJS.ErrnoException | null, files: string[]) => {
      files.forEach(file => importCommandFromFile(file));
    }
  );
};

const initGuildSaveFile = () => {
  const saveFile = fs.readFileSync(pathToGuildSaveFile).toString();
  const objJson: GuildOA[] = JSON.parse(saveFile);
  objJson.forEach((guild: GuildOA) => {
    const guildInArray: GuildInArray = {
      alias: guild.name,
      guild
    };

    guildsSave.push(guildInArray);
  });
};

export const saveGuildFile = () => {
  const guildsString: string = JSON.stringify(
    guildsSave.map(guildInArray => {
      return guildInArray.guild;
    })
  );
  fs.writeFileSync(pathToGuildSaveFile, guildsString);
};

export const init = () => {
  initGuildSaveFile();
  initCommandsArray();
};

export const UnicodeReactMap = {
  0: `1⃣`,
  1: `2⃣`,
  2: `3⃣`,
  3: `4⃣`,
  4: `5⃣`,
  5: `6⃣`,
  6: `7⃣`,
  7: `8⃣`,
  8: `9⃣`,
  9: `🔟`,
  10: `🇦`,
  11: `🇧`,
  12: `🇨`,
  13: `🇩`,
  14: `🇪`,
  15: `🇫`,
  16: `🇬`,
  17: `🇭`,
  18: `🇮`,
  19: `🇯`,
  20: `🇰`,
  21: `🇱`,
  22: `🇲`,
  23: `🇳`,
  24: `🇴`,
  25: `🇵`,
  confirmReact: "✅",
  cancelReact: "❌"
};
