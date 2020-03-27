// get all workout data from back-end

fetch("/api/workouts/range")
    .then(response => {
        return response.json();
    })
    .then(data => {
        populateChart(data);
    });

API.getWorkoutsInRange();

function generatePalette() {
    const arr = [
        "#003f5c",
        "#2f4b7c",
        "#665191",
        "#a05195",
        "#d45087",
        "#f95d6a",
        "#ff7c43",
        "ffa600",
        "#003f5c",
        "#2f4b7c",
        "#665191",
        "#a05195",
        "#d45087",
        "#f95d6a",
        "#ff7c43",
        "ffa600"
    ];

    return arr;
}
function populateChart(data) {
    let lables = labelNames(data);
    let durations = duration(data);
    let exDurations = exerciseDuration(data);
    let toWeight = totalWeight(data);
    let pounds = calculateTotalWeight(data);
    let workouts = workoutNames(data);
    const colors = generatePalette();

    let line = document.querySelector("#canvas").getContext("2d");
    let bar = document.querySelector("#canvas2").getContext("2d");
    let pie = document.querySelector("#canvas3").getContext("2d");
    let pie2 = document.querySelector("#canvas4").getContext("2d");

    let lineChart = new Chart(line, {
        type: "line",
        data: {
            labels: lables,
            datasets: [
                {
                    label: "Workout Duration In Minutes",
                    backgroundColor: "red",
                    borderColor: "red",
                    data: durations,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            title: {
                display: true
            },
            scales: {
                xAxes: [
                    {
                        display: true,
                        scaleLabel: {
                            display: true
                        }
                    }
                ],
                yAxes: [
                    {
                        display: true,
                        scaleLabel: {
                            display: true
                        }
                    }
                ]
            }
        }
    });

    let barChart = new Chart(bar, {
        type: "bar",
        data: {
            labels: lables,
            datasets: [
                {
                    label: "Pounds",
                    data: toWeight,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)"
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)"
                    ],
                    borderWidth: 1
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: "Total Pounds Lifted"
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            }
        }
    });

    let pieChart = new Chart(pie, {
        type: "pie",
        data: {
            labels: workouts,
            datasets: [
                {
                    label: "Duration of Individual Excercises Performed",
                    backgroundColor: colors,
                    data: exDurations
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: "Duration of Individual Excercises Performed"
            }
        }
    });

    let donutChart = new Chart(pie2, {
        type: "doughnut",
        data: {
            labels: workouts,
            datasets: [
                {
                    label: "Pounds Lifted in Individual Excercises",
                    backgroundColor: colors,
                    data: pounds
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: "Pounds Lifted in Individual Excercises"
            }
        }
    });
}

function duration(data) {
    let durations = [];
    const exArray = [];
    for (let h = 0; h < data.length; h++) {
        exArray.push(data[h].exercises);
    }

    for (let i = 0; i < exArray.length; i++) {
        if (exArray[i].length > 1) {
            let more = [];
            for (let j = 0; j < exArray[i].length; j++) {
                more.push(exArray[i][j].duration);
            }
            durations.push(more.reduce((a, b) => a + b, 0));
        } else {
            for (let k = 0; k < exArray[i].length; k++) {
                durations.push(exArray[i][k].duration);
            }
        }
    }
    const finalDurations = durations.slice(0, 7);

    return finalDurations;
}

function exerciseDuration(data) {
    let exDurations = [];

    data.forEach(workout => {
        workout.exercises.forEach(exercise => {
            exDurations.push(exercise.duration);
        });
    });

    return exDurations;
}

function totalWeight(data) {
    let weight = [];
    const exArray = [];
    for (let h = 0; h < data.length; h++) {
        exArray.push(data[h].exercises);
    }

    for (let i = 0; i < exArray.length; i++) {
        if (exArray[i].length > 1) {
            let more = [];
            for (let j = 0; j < exArray[i].length; j++) {
                if (exArray[i][j].weight !== undefined) {
                    more.push(exArray[i][j].weight);
                }
            }
            weight.push(more.reduce((a, b) => a + b, 0));
        } else {
            for (let k = 0; k < exArray[i].length; k++) {
                weight.push(exArray[i][k].weight);
            }
        }
    }
    const finalWeight = weight.slice(0, 7);
    return finalWeight;
}

function calculateTotalWeight(data) {
    let total = [];

    data.forEach(workout => {
        workout.exercises.forEach(exercise => {
            total.push(exercise.weight);
        });
    });

    return total;
}

function workoutNames(data) {
    let workouts = [];

    data.forEach(workout => {
        workout.exercises.forEach(exercise => {
            workouts.push(exercise.name);
        });
    });

    return workouts;
}

function labelNames(data) {
    console.log(data);
    let labels = [];
    data.forEach(workout => {
        labels.push(workout.day.substr(0, 5));
    });
    console.log(labels);
    return labels;
}
