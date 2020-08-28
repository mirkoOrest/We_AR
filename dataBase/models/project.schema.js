const {model, Schema} = require('mongoose');

const {statusEnum, tableNamesEnum} = require('../../constants/');

const ProjectSchema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },

        author: {
            type: Schema.Types.ObjectId,
            ref: tableNamesEnum.USER
        },

        participants: {
            type: [Schema.Types.ObjectId],
            required: true,
            ref: tableNamesEnum.USER
        },

        body: {
            text: {
                type: String,
                required: true
            },

            integer: {
                type: Number,
                required: true
            },

            status: {
                type: String,
                required: true,
                default: statusEnum.INACTIVE
            }
        }


    },
    {timestamps: true}
);

module.exports = model(tableNamesEnum.PROJECT, ProjectSchema);
