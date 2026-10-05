const workoutList=document.getElementById("workout-list")
const exerciseInput=document.getElementById("exercise")
const repsInput=document.getElementById("reps")
const weightInput=document.getElementById("weight")
const workouts = JSON.parse(localStorage.getItem("workouts")) || [];
const form = document.getElementById("workout-form");
const date=document.getElementById("date")
const recordsList=document.getElementById("records-list")
const totalWorkoutsList=document.getElementById("total-workouts")
const totalWeightLifted=document.getElementById("total-weight")
const workoutDate=document.getElementById("workout-date")
const exerciseAppearenceCount=document.getElementById("exercise-appearence-count")
let session = [];
const addSetButton = document.getElementById("add-set");
const currentSetsList = document.getElementById("current-sets");
const lastWorkoutList=document.getElementById("last-time")

function showSessions(){
currentSetsList.innerHTML=""
let exerciseNumber=0
  for (const group of session){
    exerciseNumber++
    const exerciseItem=document.createElement("li")
     exerciseItem.textContent = "Exercise " + exerciseNumber + ": " + group.exercise;
    currentSetsList.appendChild(exerciseItem)
    let setNumber=0
    for(const set of group.sets){
      setNumber++
      const setItem=document.createElement("li")
      setItem.textContent="Set " + setNumber + ": " + set.reps + " x " + set.weight + " kg"
      currentSetsList.appendChild(setItem)
    }
  }
}


function getSetsText(workout){
   let setsText=""
for(const set of workout.sets){
    setsText += set.reps + " x " + set.weight + " kg, ";
}
return setsText
}


exerciseInput.addEventListener("input",function(){
const lowerName=exerciseInput.value.toLowerCase()
let lastWorkout=null
for(const workout of workouts){
  if(workout.exercise.toLowerCase()===lowerName){
   lastWorkout=workout
  }}
if (lastWorkout === null) {
  lastWorkoutList.textContent = "";
  return;
}
lastWorkoutList.textContent="Last Time:"+getSetsText(lastWorkout)

})




addSetButton.addEventListener("click",function(){
if(repsInput.value.trim()===""||weightInput.value.trim()===""||exerciseInput.value.trim()==="" ){
      return;
    }
  const set={
  reps:Number(repsInput.value),
  weight:Number(weightInput.value)
}
const lastGroup=session[session.length-1]
if(lastGroup===undefined||lastGroup.exercise.toLowerCase()!==exerciseInput.value.toLowerCase()){
  const newGroup={
    exercise:exerciseInput.value,
    sets:[set],
    

  }
session.push(newGroup)}

  else{
    lastGroup.sets.push(set)
  }
 showSessions()
 

repsInput.value = "";
weightInput.value = "";

  

})

function showWorkoutDate(){
  workoutList.innerHTML=""
 
 


  const dates=[]
  for (const workout of workouts){
    if (!dates.includes(workout.date)){
      dates.push(workout.date)
     } }
 

 for (const day of dates){
  const item=document.createElement("li")
  item.textContent=day
  item.classList.add("date-heading")
  workoutList.appendChild(item)
  for (const workout of workouts){
    if(workout.date===day){
      showWorkout(workout)
    }
  }
 }
}




function FirstLetterUpperCase(string){
 return  string.charAt(0).toUpperCase()+string.slice(1)
}
function showExerciseAppearence(exerciseName){
  let appearenceCount=0
  for(const workout of workouts){
    if(workout.exercise.toLowerCase()===exerciseName.toLowerCase()){
      appearenceCount++
    }
  }
  exerciseAppearenceCount.innerHTML=""
  const item=document.createElement("li")
  item.textContent="Exercise appearence:"+" "+exerciseName+"-"+appearenceCount
  exerciseAppearenceCount.appendChild(item)
}
function showTotalWeight(workout){
  totalWeightLifted.innerHTML=""
  
  let weightVolume=0;
  for(const workout of workouts){
    for(const set of workout.sets){
  weightVolume+=set.reps*set.weight
    }}
  const item=document.createElement("li")
  item.textContent="Total volume:"+" "+weightVolume
  totalWeightLifted.appendChild(item)
  }
function totalWorkouts(){
  totalWorkoutsList.innerHTML=" "
  const totalWorkoutsOutput=workouts.length
  const item=document.createElement("li")
 item.textContent="Total Workouts"+" "+totalWorkoutsOutput
totalWorkoutsList.appendChild(item)


}

function getRecord(name){
  let best=0
  for(const workout of workouts){
    for(const set of workout.sets){
    if(workout.exercise.toLowerCase()===name.toLowerCase()   && set.weight>best){
      best=set.weight
    
    }
    }}
  return best
}

function showRecords(){
  recordsList.innerHTML= " "
  const names=[]
  for(const workout of workouts){
    const lowerName=workout.exercise.toLowerCase()
    if(!names.includes(lowerName)){
      names.push(lowerName)
    }
  }
  for(const name of names){
    const item=document.createElement("li")
    item.textContent=FirstLetterUpperCase(name)+" "+getRecord(name) +"kg"
    recordsList.appendChild(item)
  }
}

function getToday(){

  return new Date().toLocaleDateString("en-CA")
}
date.value=getToday()
function showWorkout(workout){
    const item=document.createElement("li")
    let setsText=getSetsText(workout)

    item.textContent = workout.exercise + " - " +setsText+"- Date: " + (workout.date || "no date");
   workoutList.appendChild(item)
    const deleteButton=document.createElement("button")
    deleteButton.textContent="Delete"
    item.appendChild(deleteButton)
    deleteButton.addEventListener("click",function(){
        item.remove()
        const index=workouts.indexOf(workout)
        workouts.splice(index,1)
         localStorage.setItem("workouts",JSON.stringify(workouts))
         showRecords()
         showWorkoutDate()
         totalWorkouts()
         showTotalWeight()
         showExerciseAppearence("Bench Press")
    })


}


    showWorkoutDate()
    

showRecords()
totalWorkouts()
showTotalWeight()
showExerciseAppearence("Bench Press")
form.addEventListener("submit",function(event){
    event.preventDefault();
   if (session.length===0){
      return
    }
    for(const group of session){
    const workout={
    exercise:group.exercise,
    sets: group.sets,
    date:date.value
    }
    workouts.push(workout)
   
  }
  localStorage.setItem("workouts",JSON.stringify(workouts))
  showWorkoutDate()
  showRecords()
  totalWorkouts()
  showTotalWeight()
  showExerciseAppearence("Bench Press")

  session=[]
   showSessions()
  exerciseInput.value=""
   date.value=getToday()
})









