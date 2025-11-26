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

module.exports = {
    getSingle
};