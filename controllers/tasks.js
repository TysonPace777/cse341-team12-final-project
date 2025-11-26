const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


//get all tasks
const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('tasks').find();
        result.toArray().then((tasks) => {
            res.setHeader('Content-type', 'application/json');
            res.status(200).json(tasks);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//get one task
const getSingle = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Must use a valid task ID.' });
        }
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('tasks').find({ _id: userId });
        result.toArray().then((users) => {
            res.setHeader('Content-type', 'application/json');
            res.status(200).json(users[0]);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    getAll,
    getSingle,
};