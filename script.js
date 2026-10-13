const workoutList = document.getElementById("workout-list")
const exerciseInput = document.getElementById("exercise")
const repsInput = document.getElementById("reps")
const weightInput = document.getElementById("weight")
const workouts = JSON.parse(localStorage.getItem("workouts")) || [];
const form = document.getElementById("workout-form");
const date = document.getElementById("date")
const recordsList = document.getElementById("records-list")
const totalWorkoutsList = document.getElementById("total-workouts")
const totalWeightLifted = document.getElementById("total-weight")
let session = [];
const addSetButton = document.getElementById("add-set");
const currentSetsList = document.getElementById("current-sets");
const lastTimeText = document.getElementById("last-time")
function refreshPage() {
  showWorkoutDate();
  showRecords();
  totalWorkouts();
  showTotalWeight();
}

function showSession() {
  currentSetsList.innerHTML = ""
  let exerciseNumber = 0
  for (const group of session) {
    exerciseNumber++
    const exerciseItem = document.createElement("li")
    exerciseItem.textContent = "Exercise " + exerciseNumber + ": " + group.exercise;
    currentSetsList.appendChild(exerciseItem)
    let setNumber = 0
    for (const set of group.sets) {
      setNumber++
      const setItem = document.createElement("li")
      setItem.textContent = "Set " + setNumber + ": " + set.reps + " x " + set.weight + " kg"
      currentSetsList.appendChild(setItem)
    }
  }
}


function getSetsText(workout) {
  return workout.sets.map(function (set) { return set.reps + " x " + set.weight + " kg" }).join(", ")
}


exerciseInput.addEventListener("input", function () {
  const lowerName = exerciseInput.value.toLowerCase();
  const matching = workouts.filter(function (workout) {
    return workout.exercise.toLowerCase() === lowerName;
  });

  if (matching.length === 0) {
    lastTimeText.textContent = "";
    return;
  }

  const lastWorkout = matching[matching.length - 1];
  lastTimeText.textContent = "Last time: " + getSetsText(lastWorkout) + " (done " + matching.length + " times)";
});




addSetButton.addEventListener("click", function () {
  if (repsInput.value.trim() === "" || weightInput.value.trim() === "" || exerciseInput.value.trim() === "") {
    return;
  }
  const set = {
    reps: Number(repsInput.value),
    weight: Number(weightInput.value)
  }
  const lastGroup = session[session.length - 1]
  if (lastGroup === undefined || lastGroup.exercise.toLowerCase() !== exerciseInput.value.toLowerCase()) {
    const newGroup = {
      exercise: exerciseInput.value,
      sets: [set],


    }
    session.push(newGroup)
  }

  else {
    lastGroup.sets.push(set)
  }
  showSession()


  repsInput.value = "";
  weightInput.value = "";



})

function showWorkoutDate() {
  workoutList.innerHTML = ""




  const dates = []
  for (const workout of workouts) {
    if (!dates.includes(workout.date)) {
      dates.push(workout.date)
    }
  }


  for (const day of dates) {
    const item = document.createElement("li")
    item.textContent = day
    item.classList.add("date-heading")
    workoutList.appendChild(item)
    const dayWorkouts = workouts.filter(function (workout) {
      return workout.date === day
    })
    for (const workout of dayWorkouts) {
      showWorkout(workout);
    }
  }
}




function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function showTotalWeight() {
  totalWeightLifted.innerHTML = ""

  let weightVolume = 0;
  for (const workout of workouts) {
    for (const set of workout.sets) {
      weightVolume += set.reps * set.weight
    }
  }
  const item = document.createElement("li")
  item.textContent = "Total volume:" + " " + weightVolume
  totalWeightLifted.appendChild(item)
}
function totalWorkouts() {
  totalWorkoutsList.innerHTML = " "
  const totalWorkoutsOutput = workouts.length
  const item = document.createElement("li")
  item.textContent = "Total Workouts" + " " + totalWorkoutsOutput
  totalWorkoutsList.appendChild(item)


}

function getRecord(name) {
  let best = 0
  for (const workout of workouts) {
    for (const set of workout.sets) {
      if (workout.exercise.toLowerCase() === name.toLowerCase() && set.weight > best) {
        best = set.weight

      }
    }
  }
  return best
}

function showRecords() {
  recordsList.innerHTML = " "
  const names = []
  for (const workout of workouts) {
    const lowerName = workout.exercise.toLowerCase()
    if (!names.includes(lowerName)) {
      names.push(lowerName)
    }
  }
  for (const name of names) {
    const item = document.createElement("li")
    item.textContent = capitalize(name) + " " + getRecord(name) + "kg"
    recordsList.appendChild(item)
  }
}

function getToday() {

  return new Date().toLocaleDateString("en-CA")
}
date.value = getToday()
function showWorkout(workout) {
  const item = document.createElement("li")
  const setsText = getSetsText(workout)

  item.textContent = workout.exercise + " - " + setsText
  workoutList.appendChild(item)
  const deleteButton = document.createElement("button")
  deleteButton.textContent = "Delete"
  item.appendChild(deleteButton)
  deleteButton.addEventListener("click", function () {
    item.remove()
    const index = workouts.indexOf(workout)
    workouts.splice(index, 1)
    localStorage.setItem("workouts", JSON.stringify(workouts)); 
    refreshPage()
  })


}


refreshPage()
form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (session.length === 0) {
    return
  }
  for (const group of session) {
    const workout = {
      exercise: group.exercise,
      sets: group.sets,
      date: date.value
    }
    workouts.push(workout)

  }
  localStorage.setItem("workouts", JSON.stringify(workouts))
  refreshPage()

  session = []
  showSession()
  exerciseInput.value = ""
  lastTimeText.textContent=""
  date.value = getToday()
})









