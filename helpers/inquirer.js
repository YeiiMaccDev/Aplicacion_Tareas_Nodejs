const inquirer = require('inquirer');
require('colors');

const menuOptions = [
    {
        type: 'list',
        name: 'option',
        message: 'what do you want to do?',
        choices: [
            {
                value: '1',
                name: '1. Create task'
            },
            {
                value: '2',
                name: '2. List tasks'
            },
            {
                value: '3',
                name: '3. List completed tasks'
            },
            {
                value: '4',
                name: '4. List pending task'
            },
            {
                value: '5',
                name: '5. Complete task'
            },
            {
                value: '6',
                name: '6. Delete task'
            },
            {
                value: '0',
                name: '0. Exit'
            },
        ]

    }
];

const inquirerMenu = async () => {
    console.clear();

    const title = `==============================\n   Please select an option   \n============================== \n`;
    console.log(title.green);

    const { option } = await inquirer.prompt(menuOptions);

    return option;
}

const pause = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `\n Press ${'ENTER'.green} to continue \n`
        }
    ]

    await inquirer.prompt(question);
}

const readInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if (value.length === 0) {
                    return 'Please enter a value.'
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listTasksDelete = async( tasks = [] ) => {

    const choices = tasks.map( (task, i) => {
        const idx = i + 1;
        return {
            value: task.id,
            name: `${idx} ${task.description}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0. Cancel'
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Delete',
            choices
        }
    ]

    const { id } = await inquirer.prompt(questions);
    return id;
}

const confirm = async(message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]
    
    const { ok } = await inquirer.prompt(question);
    return ok;
}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listTasksDelete,
    confirm
}