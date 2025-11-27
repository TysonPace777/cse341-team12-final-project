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
    const rawId = String(req.params.id).trim();
    if (ObjectId.isValid(rawId)) {
      const byOid = await mongodb
        .getDatabase()
        .db()
        .collection('tasks')
        .findOne({ _id: new ObjectId(rawId) });

      if (byOid) {
        return res.status(200).json(byOid);
      }
    }

    const byString = await mongodb
      .getDatabase()
      .db()
      .collection('tasks')
      .findOne({ _id: rawId });

    if (byString) {
      return res.status(200).json(byString);
    }

    return res.status(404).json({ message: 'Task not found' });
  } catch (err) {
    console.error('getSingle error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


const deleteTask = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid task id to delete a task.');
  }
  const taskId = new ObjectId(req.params.id);
  try {
    const response = await mongodb.getDatabase().db().collection('tasks').deleteOne({ _id: taskId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json(response.error || 'Task not found.');
    }
  } catch (err) {
    console.error('deleteTask error:', err, typeof err);
    res.status(500).json({ message: err });
  }
};

module.exports = {
    getAll,
    getSingle,
    deleteTask
};