const devPro = require("./devPro");
const inquirer = require('inquirer');


inquirer
.prompt([ // questions
  {
    name: 'git_name',
    message: 'What is your git id?',
    default: 'irtzmalik',
  },
    {
      name: 'faveColor',
      message: 'What is your favorite color?',
      default: '#ff8374',
    },
  
  ])
  .then(answers => {

    
    console.info('Answer:', answers.faveColor,answers.git_name);
    const DevPro = new devPro(); // creating new object

    DevPro.disp(answers.faveColor,answers.git_name);
  });





