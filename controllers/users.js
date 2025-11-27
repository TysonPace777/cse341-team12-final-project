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
  try {
    const rawId = String(req.params.id).trim();

    if (!ObjectId.isValid(rawId)) {
      return res.status(400).json({ message: 'Must use a valid ObjectId to delete a user.' });
    }

    const userId = new ObjectId(rawId);
    console.log('Deleting user with ID:', userId);

    const response = await mongodb.getDatabase().db().collection('user').deleteOne({ _id: userId });
    console.log('Delete response:', response);

    if (response.deletedCount > 0) {
      return res.status(204).send(); // success, no content
    } else {
      return res.status(404).json({ message: 'User not found.' });
    }
  } catch (err) {
    console.error('deleteUser error:', err, typeof err);
    return res.status(500).json({ message: err.message });
  }
};


module.exports = {
    getSingle,
    deleteUser
};