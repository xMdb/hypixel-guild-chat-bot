require('dotenv').config();
const chalk = require('chalk');

module.exports = {
   name: 'end',
   async execute(error) {
      console.log(chalk.redBright('End event fired.'));
      console.error(error);
      console.log(chalk.redBright('Restarting in 15 seconds.'));
      setTimeout(() => {
         process.exit(1);
      }, 15 * 1000);
   },
};
