const Task = require("./task");

class Tasks {

    _list = {};

    get listArray() {
        const list = [];
        Object.keys(this._list).forEach(key => {
            const task = this._list[key];
            list.push(task);
        });
        return list;
    }

    constructor() {
        this._list = {};
    }

    // Upload file data to memory
    loadArrayTasks(tasks = []) {
        tasks.forEach(task => {
            this._list[task.id] = task
        });
    }

    createTasks(description = '') {
        const task = new Task(description);
        this._list[task.id] = task;
    }

    completeList() {
        console.log('');
        this.listArray.forEach((task, index) => {
            const idx = `${index + 1}`.green;
            const { description, complete } = task;
            const status = (complete)
                ? 'Completed'.green
                : 'Pending'.red;
            console.log(` ${idx} ${description} :: ${status}`);
        });
    }

    listPendingCompleted(pending = true) {
        console.log();
        let counter = 0;
        this.listArray.forEach(task => {
            const { description, complete } = task;
            const status = (complete)
                ? 'Completed'.green
                : 'Pending'.red;

            if (pending) { // show pending
                if ( !complete ) {
                    counter += 1;
                    console.log(`${counter.toString().green} ${description} :: ${status}`);
                }
            } else { // show complete
                if ( complete ) {
                    counter += 1;
                    console.log(`${counter.toString().green} ${description} :: ${status}`);
                }
            }
        });
    }
}

module.exports = Tasks;