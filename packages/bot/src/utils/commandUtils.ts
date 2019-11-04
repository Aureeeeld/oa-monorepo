import fs from "fs";
import recursive from "recursive-readdir";

import { commandsArray } from "../commands";
import { Command, CommandInArray } from "../commands/types";

const pathToCommands: string = fs.realpathSync("src/commands/");

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

export const initCommandsArray = () => {
  recursive(
    pathToCommands,
    async (err: NodeJS.ErrnoException | null, files: string[]) => {
      files.forEach(file => importCommandFromFile(file));
    }
  );
};
