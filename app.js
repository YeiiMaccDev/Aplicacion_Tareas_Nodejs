require('colors');

const { inquirerMenu, pause, readInput, listTasksDelete, confirm } = require('./helpers/inquirer');
const { saveData, readData } = require('./helpers/saveFile');
const Tasks = require('./models/tasks');


const main = async () => {

    let opt = ``;
    const tasks = new Tasks();

    const taskDb = readData(); // Upload file data to memory
    if (taskDb) {
        tasks.loadArrayTasks(taskDb);
    }

    // await pause();

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // CreateTask
                const desc = await readInput('Description: ');
                tasks.createTasks(desc);
                break;

            case '2':
                // ListTasks
                tasks.completeList();
                break;

            case '3':
                // ListCompletedTasks
                tasks.listPendingCompleted(false);
                break;

            case '4':
                // ListPendingTasks
                tasks.listPendingCompleted(true);
                break;

            case '6':
                const id = await listTasksDelete(tasks.listArray);
                if (id !== '0') {
                    const statusConfirm = await confirm('Are you sure?');
                    if (statusConfirm) {
                        tasks.deleteTask(id);
                        console.log('- Task successfully deleted'.yellow);
                    }
                }

            default:
                break;
        }

        saveData(tasks.listArray);

        await pause();

    } while (opt !== '0');
}

main();