#!/usr/bin/env node

import { program } from "commander";
import { findDuplicate } from "./commands/findDuplicates.js";

interface Option {
  path?: string,
  inquirer?: boolean
}

program
.command('scan')
.description('scan for any duplicate files')
.option("-p --path <path>", '.')
.option("--inquirer")
.action(async (option: Option) => {
  await findDuplicate(option.path!, option.inquirer ?? false)
})