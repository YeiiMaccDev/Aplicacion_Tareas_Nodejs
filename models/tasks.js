const Task = require("./task");

class Tasks {

    _list = {};

    get listArray() {
        const list = [];
        Object.keys(this._list).forEach( key => {
            const task = this._list[key];
            list.push( task );
        });
        return list;
    }

    constructor () {
        this._list = {};
    }

    // Upload file data to memory
    loadArrayTasks(tasks = []) {
        tasks.forEach( task => {
            this._list[task.id] = task
        });
    }

    createTasks(description = '') {
        const task = new Task(description);
        this._list[task.id] = task;
    }

}

module.exports = Tasks;