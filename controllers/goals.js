const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

// Get all goals
const getAll = async (req, res) => {
    try {
        const result = await mongodb
            .getDatabase()
            .db()
            .collection("goals")
            .find();
        result.toArray().then((goals) => {
            res.setHeader("Content-type", "application/json");
            res.status(200).json(goals);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get single book by ID
// const getSingle = async (req, res) => {
//   try {
//     const goalId = req.params.id;
//     const goal = await mongodb.getDatabase().db().collection('goals').findOne({ _id: goalId });

//     if (!goal) return res.status(404).json({ message: 'Goal not found' });

//     res.status(200).json(goal);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

const getSingle = async (req, res) => {
    try {
        const rawId = String(req.params.id).trim();

        // If valid ObjectId (24 hex chars)
        const filter = ObjectId.isValid(rawId)
            ? { _id: new ObjectId(rawId) }
            : { _id: rawId };

        const goal = await mongodb
            .getDatabase()
            .db()
            .collection("goals")
            .findOne(filter);

        if (!goal) return res.status(404).json({ message: "Goal not found" });

        res.status(200).json(goal);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a Goal
const createGoal = async (req, res) => {
    try {
        const { what, time } = req.body;

        const goal = { what, time };

        const response = await mongodb
            .getDatabase()
            .db()
            .collection("goals")
            .insertOne(goal);
        res.status(201).json({
            message: "Goal created successfully",
            goalId: response.insertedId,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a Goal
const updateGoal = async (req, res) => {
    try {
        const rawId = req.params.id;

        if (!ObjectId.isValid(rawId)) {
            return res.status(400).json({ error: "Invalid Goal ID" });
        }
        const goalId = new ObjectId(rawId);
        const { what, time } = req.body;
        const updatedGoal = { what, time };
        const response = await mongodb
            .getDatabase()
            .db()
            .collection("goals")
            .updateOne({ _id: goalId }, { $set: updatedGoal });

        if (response.matchedCount === 0) {
            return res.status(404).json({ error: "Goal not found" });
        }

        if (response.modifiedCount === 0) {
            return res.status(200).json({ message: "No changes were made" });
        }

        res.status(200).json({ message: "Goal updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a Goal
const deleteGoal = async (req, res) => {
    try {
        const rawId = req.params.id;

        if (!ObjectId.isValid(rawId)) {
            return res.status(400).json({ error: "Invalid Goal ID" });
        }

        const goalId = new ObjectId(rawId);
        const response = await mongodb
            .getDatabase()
            .db()
            .collection("goals")
            .deleteOne({ _id: goalId });

        if (response.deletedCount > 0)
            return res
                .status(200)
                .json({ message: "Goal deleted successfully" });
        res.status(404).json({ error: "Goal not found" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAll, getSingle, createGoal, updateGoal, deleteGoal };
