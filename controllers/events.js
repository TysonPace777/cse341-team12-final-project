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


module.exports = { getAll, getSingle };