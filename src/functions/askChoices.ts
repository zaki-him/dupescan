import inquirer from "inquirer"

export const askChoices = async () => {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What do you want to do with duplicates?",
      choices: [
        { name: "Delete duplicates (keep first)", value: "delete" },
        { name: "Move duplicates to 'duplicates' folder", value: "move" },
        { name: "Do nothing", value: "skip" }
      ]
    }
  ])

  return answers.action
}