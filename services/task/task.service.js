const {TaskModel} = require('../../dataBase');

module.exports = {

    createTask: (task) => {
        const taskToCreate = new TaskModel(task);

        return taskToCreate.save();
    },


    getTasks: () => {
        return TaskModel.find({});
    },


    getTaskByParams: (params) => {
        const {participants, status, integer, name, author_id, text} = params

        return TaskModel.find({
            $or: [
                {name},
                {"description.text": text},
                {author: author_id},
                {"description.integer": integer},
                {"description.status": status},
                {participants: {$in:[participants]}}
            ]
        });
    },


    getTaskByComplexParams: (params) => {
        const {participants, status, integer} = params

        return TaskModel.find({$and : [
                {participants: {$in:[participants]}},
                {"description.integer": {$gte : integer}},
                {"description.status": status}
            ]});
    }

};
