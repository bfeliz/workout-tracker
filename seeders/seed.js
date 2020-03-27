let mongoose = require("mongoose");
let db = require("../models");
const moment = require("moment");

mongoose.connect("mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false
});

// seed to get database filled for immediate data visualisation
let workoutSeed = [
    {
        day: moment()
            .subtract(10, "day")
            .format("L"),
        exercises: [
            {
                type: "resistance",
                name: "Bicep Curl",
                duration: 30,
                weight: 100,
                reps: 10,
                sets: 5
            }
        ]
    },
    {
        day: moment()
            .subtract(9, "day")
            .format("L"),
        exercises: [
            {
                type: "resistance",
                name: "Lateral Pull",
                duration: 25,
                weight: 300,
                reps: 10,
                sets: 4
            }
        ]
    },
    {
        day: moment()
            .subtract(8, "day")
            .format("L"),
        exercises: [
            {
                type: "resistance",
                name: "Push Press",
                duration: 20,
                weight: 185,
                reps: 8,
                sets: 4
            }
        ]
    },
    {
        day: moment()
            .subtract(7, "day")
            .format("L"),
        exercises: [
            {
                type: "cardio",
                name: "Running",
                duration: 40,
                distance: 4
            }
        ]
    },
    {
        day: moment()
            .subtract(6, "day")
            .format("L"),
        exercises: [
            {
                type: "resistance",
                name: "Bench Press",
                duration: 30,
                weight: 285,
                reps: 10,
                sets: 4
            }
        ]
    },
    {
        day: moment()
            .subtract(5, "day")
            .format("L"),
        exercises: [
            {
                type: "resistance",
                name: "Shrugs",
                duration: 25,
                weight: 135,
                reps: 5,
                sets: 5
            }
        ]
    },
    {
        day: moment()
            .subtract(4, "day")
            .format("L"),
        exercises: [
            {
                type: "resistance",
                name: "Quad Press",
                duration: 10,
                weight: 300,
                reps: 3,
                sets: 7
            }
        ]
    },
    {
        day: moment()
            .subtract(3, "day")
            .format("L"),
        exercises: [
            {
                type: "resistance",
                name: "Deadlift",
                duration: 5,
                weight: 350,
                reps: 1,
                sets: 1
            }
        ]
    },
    {
        day: moment()
            .subtract(2, "day")
            .format("L"),
        exercises: [
            {
                type: "resistance",
                name: "Military Press",
                duration: 15,
                weight: 75,
                reps: 10,
                sets: 4
            }
        ]
    },
    {
        day: moment()
            .subtract(1, "day")
            .format("L"),
        exercises: [
            {
                type: "cardio",
                name: "Running",
                duration: 10,
                distance: 1
            }
        ]
    }
];

db.Workout.deleteMany({})
    .then(() => db.Workout.collection.insertMany(workoutSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
