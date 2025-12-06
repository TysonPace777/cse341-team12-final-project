const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

//get all events
const getAll = async (req, res) => {
    try {
        const result = await mongodb
            .getDatabase()
            .db()
            .collection("events")
            .find();
        result.toArray().then((tasks) => {
            res.setHeader("Content-type", "application/json");
            res.status(200).json(tasks);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//get one event
const getSingle = async (req, res) => {
    try {
        const rawId = String(req.params.id).trim();
        if (ObjectId.isValid(rawId)) {
            const byOid = await mongodb
                .getDatabase()
                .db()
                .collection("events")
                .findOne({ _id: new ObjectId(rawId) });

            if (byOid) {
                return res.status(200).json(byOid);
            }
        }

        const byString = await mongodb
            .getDatabase()
            .db()
            .collection("events")
            .findOne({ _id: rawId });

        if (byString) {
            return res.status(200).json(byString);
        }

        return res.status(404).json({ message: "Event not found" });
    } catch (err) {
        console.error("getSingle error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const createEvent = async (req, res) => {
    try {
        const { eventName, location, date } = req.body;

        const event = { eventName, location, date };

        const response = await mongodb
            .getDatabase()
            .db()
            .collection("events")
            .insertOne(event);
        res.status(201).json({
            message: "Event created successfully",
            eventId: response.insertedId,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an event
const updateEvent = async (req, res) => {
    try {
        const rawId = req.params.id;

        if (!ObjectId.isValid(rawId)) {
            return res.status(400).json({ error: "Invalid Event ID" });
        }
        const eventId = new ObjectId(rawId);
        const { eventName, location, date } = req.body;
        const updatedGoal = { eventName, location, date };
        const response = await mongodb
            .getDatabase()
            .db()
            .collection("events")
            .updateOne({ _id: eventId }, { $set: updatedGoal });

        if (response.matchedCount === 0) {
            return res.status(404).json({ error: "Event not found" });
        }

        if (response.modifiedCount === 0) {
            return res.status(200).json({ message: "No changes were made" });
        }

        res.status(200).json({ message: "Event updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete an event
const deleteEvent = async (req, res) => {
    try {
        const rawId = req.params.id;

        if (!ObjectId.isValid(rawId)) {
            return res.status(400).json({ error: "Invalid Event ID" });
        }

        const eventId = new ObjectId(rawId);
        const response = await mongodb
            .getDatabase()
            .db()
            .collection("events")
            .deleteOne({ _id: eventId });

        if (response.deletedCount > 0)
            return res
                .status(200)
                .json({ message: "Event deleted successfully" });
        res.status(404).json({ error: "Event not found" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAll, getSingle, createEvent, updateEvent, deleteEvent };
