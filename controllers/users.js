const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

//gets one user
const getSingle = async (req, res) => {
  try {
    const rawId = String(req.params.id).trim();
    if (ObjectId.isValid(rawId)) {
      const byOid = await mongodb
        .getDatabase()
        .db()
        .collection('user')
        .findOne({ _id: new ObjectId(rawId) });

      if (byOid) {
        return res.status(200).json(byOid);
      }
    }

    const byString = await mongodb
      .getDatabase()
      .db()
      .collection('user')
      .findOne({ _id: rawId });

    if (byString) {
      return res.status(200).json(byString);
    }

    return res.status(404).json({ message: 'User not found' });
  } catch (err) {
    console.error('getSingle error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


const deleteUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid user id to delete a user.');
  }
  const userId = new ObjectId(req.params.id);
  try {
    const response = await mongodb.getDb().collection('user').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json(response.error || 'User not found.');
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = {
    getSingle,
    deleteUser
};