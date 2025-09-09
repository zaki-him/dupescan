import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
export const findDuplicate = (targetPath) => {
    const absPath = path.resolve(targetPath);
    if (!fs.existsSync(absPath)) {
        console.log(chalk.red("Incorrect path / folder doesn't exists"));
        return;
    }
    const files = fs.readdirSync(absPath);
    if (files.length === 0) {
        console.log(chalk.yellow("Empty folder"));
        return;
    }
};
//# sourceMappingURL=findDuplicates.js.map