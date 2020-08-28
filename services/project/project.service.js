const {ProjectModel} = require('../../dataBase');

module.exports = {

    createProject: (project) => {
        const projectToCreate = new ProjectModel(project);

        return projectToCreate.save();
    },


    getAllProjects: () => {
        return ProjectModel.find({});
    },


    getProjectByParams: (params) => {
        const {participants, status, integer, name, author_id, text} = params

        return ProjectModel.find({
            $or: [
                {name},
                {"body.text": text},
                {author: author_id},
                {"body.integer": integer},
                {"body.status": status},
                {participants: {$in: [participants]}}
            ]
        });
    },


    getProjectByComplexParams: (params) => {
        const {participants, status, integer} = params

        return ProjectModel.find({
            $and: [
                {participants: {$in: [participants]}},
                {"body.status": status},
                {"body.integer": {$gte: integer}}
            ]
        });
    },


    getAvgStatus: (status) => {
        return ProjectModel.aggregate([
            {
                $match: {
                    "body.status": status
                }
            },
            {
                $group: {
                    _id: "",
                    "avgInt": {
                        $avg: "$body.integer"
                    }
                }
            }
        ])
    }

};
