import chalk from "chalk";
import inquirer from "inquirer";

// Classes Player & Opponent
class Player {
  name: string;
  fuel: number = 100;
  constructor(name: string) {
    this.name = name;
  }
  fuelDecrease() {
    this.fuel -= 25;
  }
  fuelIncrease() {
    this.fuel = 100;
  }
}

class Opponent {
  name: string;
  fuel: number = 100;
  constructor(name: string) {
    this.name = name;
  }
  fuelDecrease() {
    this.fuel -= 25;
  }
}

// Player Name & Opponent Select
let player = await inquirer.prompt({
  type: "input",
  name: "name",
  message: "Please Enter Your Name:",
});

let opponent = await inquirer.prompt({
  type: "list",
  name: "select",
  message: "Select Your Opponent",
  choices: ["Skeleton", "Assassin", "Zombie"],
});

// Gather Data
let p1 = new Player(player.name);
let o1 = new Opponent(opponent.select);

const gameLoop = async () => {
  while (true) {
    let ask = await inquirer.prompt({
      type: "list",
      name: "options",
      message: `What do you want to do against ${o1.name}?`,
      choices: ["Attack", "Drink Potion", "Run For Your Life.."],
    });

    switch (ask.options) {
      case "Attack":
        let num = Math.floor(Math.random() * 2);
        if (num > 0) {
          p1.fuelDecrease();
          console.log(chalk.bold.green(`${p1.name} fuel is ${p1.fuel}`));
          console.log(chalk.bold.red(`${o1.name} fuel is ${o1.fuel}`));
          if (p1.fuel <= 0) {
            console.log(
              chalk.red.bold.italic("You Lose, Better Luck Next Time ")
            );
            process.exit();
          }
        } else {
          o1.fuelDecrease();
          console.log(chalk.bold.green(`${p1.name} fuel is ${p1.fuel}`));
          console.log(chalk.bold.red(`${o1.name} fuel is ${o1.fuel}`));
          if (o1.fuel <= 0) {
            console.log(chalk.green.bold.italic("You Win!"));
            process.exit();
          }
        }
        break;

      case "Drink Potion":
        p1.fuelIncrease();
        console.log(
          chalk.bold.italic.green(
            `You drank a health potion. Your fuel is now ${p1.fuel}`
          )
        );
        break;

      case "Run For Your Life..":
        console.log(chalk.red.bold.italic("You Lose, Better Luck Next Time "));
        process.exit();
        break;

      default:
        console.log(chalk.red.bold.italic("Invalid choice"));
    }
  }
};

gameLoop();
