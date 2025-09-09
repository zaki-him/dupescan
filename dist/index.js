#!/usr/bin/env node
import { program } from "commander";
import { findDuplicate } from "./commands/findDuplicates.js";
program
    .command('scan')
    .description('scan for any duplicate files')
    .option("-p --path <path>", '.')
    .action((option) => {
    findDuplicate(option.path ?? '.');
});
//# sourceMappingURL=index.js.map