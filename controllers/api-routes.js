const router = require("express").Router();
const db = require("../models/Workout.js");
const path = require("path");

router.get("/api/workouts", (req, res) => {
	db.aggregate([{
        $addFields: {
            totalDuration: {
                $sum: "$exercises.duration",
            },
        },
    }, ])
		.then((dbData) => {
			res.json(dbData);
		})
		.catch((err) => {
			res.json(err);
		});
});

router.get("/api/workouts/range", (req, res) => {
    db.aggregate([{
        $addFields: {
            totalDuration: {
                $sum: "$exercises.duration",
            },
        },
    }, ])
    .sort({ _id: -1 })
    .limit(7)
    .then((dbData) => {
        console.log(dbData);
        res.json(dbData);
    })
    .catch((err) => {
        res.json(err);
    });
});

router.post("/api/workouts", (req, res) => {
	db.create(req.body)
		.then((dbData) => {
			res.json(dbData);
		})
		.catch((err) => {
			res.json(err);
		});
});

router.put("/api/workouts/:id", ({ body, params }, res) => {
	db.findByIdAndUpdate(params.id, { $push: { exercises: body } })
		.then((dbData) => {
			res.json(dbData);
		})
		.catch((err) => {
			res.json(err);
		});
});

module.exports = router;