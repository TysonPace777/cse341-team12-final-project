const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// =========================
// GET ALL USERS
// =========================
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

// =========================
// GET USER BY USERNAME OR ID
// =========================
const getSingle = async (req, res) => {
  try {
    const identifier = String(req.params.id).trim();
    const usersCollection = mongodb.getDatabase().db().collection('user');

    let user = null;

    // 1️⃣ If it's a valid ObjectId, search by _id
    if (ObjectId.isValid(identifier)) {
      user = await usersCollection.findOne({ _id: new ObjectId(identifier) });
    }

    // 2️⃣ If not found, try searching by username
    if (!user) {
      user = await usersCollection.findOne({ username: identifier });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error("getSingle error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// =========================
// CREATE USER (GitHub-style)
// =========================
const createUser = async (req, res) => {
  try {
    const { username, displayName, profileUrl } = req.body;

    if (!username) {
      return res.status(400).json({ error: "username is required" });
    }

    const usersCollection = mongodb.getDatabase().db().collection("user");

    // Prevent duplicates
    const existing = await usersCollection.findOne({ username });
    if (existing) {
      return res.status(409).json({ error: "User already exists" });
    }

    const newUser = { username, displayName, profileUrl };

    const response = await usersCollection.insertOne(newUser);

    return res.status(201).json({
      message: "User created successfully",
      userId: response.insertedId,
    });
  } catch (err) {
    console.error('createUser error:', err);
    return res.status(500).json({ error: err.message });
  }
};

// Update User (by ID or username)
const updateUser = async (req, res) => {
  try {
    const param = req.params.id;

    // Determine whether param is ObjectId or username
    const filter = ObjectId.isValid(param)
      ? { _id: new ObjectId(param) }
      : { username: param };

    const { displayName, profileUrl } = req.body;
    const updatedUser = { displayName, profileUrl };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection('user')
      .updateOne(filter, { $set: updatedUser });

    if (response.modifiedCount > 0)
      return res.status(200).json({ message: 'User updated' });

    res.status(404).json({ error: 'User not found or no changes made' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete User (by ID or username)
const deleteUser = async (req, res) => {
  try {
    const param = req.params.id;

    const filter = ObjectId.isValid(param)
      ? { _id: new ObjectId(param) }
      : { username: param };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection('user')
      .deleteOne(filter);

    if (response.deletedCount > 0)
      return res.status(204).send();

    res.status(404).json({ error: 'User not found.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
