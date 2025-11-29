const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Gets all users
const getAll = async (req, res) => {
  try {
    const users = await mongodb
      .getDatabase()
      .db()
      .collection('user') 
      .find()
      .toArray();

    return res.status(200).json(users);
  } catch (err) {
    console.error('getAll error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


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

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, location, age, language, birthMonth, birthYear } = req.body;

    const user = { firstName, lastName, location, age, language, birthMonth, birthYear };

    const response = await mongodb
      .getDatabase()
      .db().collection("user")
      .insertOne(user);
    res
      .status(201)
      .json({
        message: "User created successfully",
        UserId: response.insertedId,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const UserId = new ObjectId(req.params.id);
    const { firstName, lastName, location, age, language, birthMonth, birthYear } = req.body;
    const updatedUser = { firstName, lastName, location, age, language, birthMonth, birthYear };
    const response = await mongodb.getDatabase().db().collection('user').updateOne({ _id: UserId }, { $set: updatedUser });

    if (response.modifiedCount > 0) return res.status(200).json({ message: 'User updated' });
    res.status(404).json({ error: 'User not found or no changes made' });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser
};