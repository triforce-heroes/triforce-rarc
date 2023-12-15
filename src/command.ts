import { program } from "commander";

import { ExtractCommand } from "./commands/ExtractCommand.js";
import { CompressCommand } from "./commands/RebuildCommand.js";

program
  .command("rebuild")
  .description("rebuild to RARC file")
  .argument("<input>", "directory to be rebuilded")
  .argument("[output]", "output file")
  .action(CompressCommand);

program
  .command("extract")
  .description("extract RARC file to a directory")
  .argument("<input>", "RARC file to be extracted")
  .argument("[output]", "output directory")
  .action(ExtractCommand);

program.parse();
