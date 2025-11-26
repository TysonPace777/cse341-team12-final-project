const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

//gets one user
const getSingle = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Must use a valid user ID.' });
        }
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId });
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
    getSingle
};