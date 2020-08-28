const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const {PORT, MONGODB_URL} = require('./config');

const {
    projectRouter,
    taskRouter,
    userRouter
} = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

setupDb();

function setupDb() {
    mongoose.connect(MONGODB_URL, {useNewUrlParser: true});

    const db = mongoose.connection;
    db.on('error', err => console.log(`Connection Error`));
    db.once('open', () => console.log(`Connected to Db`));
}

app.use('/api/projects', projectRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/users', userRouter);

app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 400)
        .json({
            message: err.message,
            code: err.customCode
        })
});

app.listen(PORT, err => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Listen ${PORT} port ...`)
    }
});
