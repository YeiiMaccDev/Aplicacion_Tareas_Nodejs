const { v4: uuidv4 } = require('uuid');

class Task {
    id = '';
    description = '';
    complete = null;

    constructor(description) {
        this.id = uuidv4();
        this.description = description;
        this.complete = null;
    }
}

module.exports = Task;