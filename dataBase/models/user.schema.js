const {model, Schema} = require('mongoose');

const {tableNamesEnum} = require('../../constants/');

const UserSchema = new Schema({
        email: {
            type: String,
            required: true,
            unique: true
        },

        name: {
            type: String,
            required: true
        },

        surname: {
            type: String,
            required: true
        },

        projectIds: {
            type: [Schema.Types.ObjectId],
            required: true,
            default: []
        },

        taskIds: {
            type: [Schema.Types.ObjectId],
            required: true,
            default: []
        }
    },
    {timestamps: true}
);

module.exports = model(tableNamesEnum.USER, UserSchema);
