#!/usr/bin/env node

import { program } from "commander";
import { findDuplicate } from "./commands/findDuplicates.js";

interface Option {
  path?: string
}

program
.command('scan')
.description('scan for any duplicate files')
.option("-p --path <path>", '.')
.action((option: Option) => {
  findDuplicate(option.path ?? '.')
})