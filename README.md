# Exercise Tracker

A simple workout logbook for the gym. Log your exercises, see your personal records, and track your progress, right from your phone.

**Live demo:**https://dianhristovv.github.io/exercise-tracker/

## Features

- **Log workouts** with exercise name, sets, reps, weight and date
- **Date pre-filled with today**, but you can pick another day to log past workouts
- **Workouts grouped by day** under date headings
- **Personal records**: automatically finds your heaviest weight for every exercise
- **Statistics**: total workouts logged and total training volume (sets x reps x weight)
- **Exercise counter**: how many times you have done a specific exercise
- **Delete** a workout logged by mistake
- **Saved in the browser**: your data stays after closing the page
- **Input validation**: empty or blank workouts are not saved
- **Case-insensitive names**: "Bench Press" and "bench press" count as the same exercise

## Built with

- HTML
- CSS
- JavaScript (no frameworks or libraries)
- localStorage for saving data

## What I learned

This was my first JavaScript project. While building it, I learned:

- Working with the DOM: finding, creating and removing elements
- Event listeners for forms and buttons
- Objects and arrays to store structured data
- Loops, including nested loops for grouping by day
- Functions that return values and functions that update the page
- Common patterns: finding a maximum, calculating a running total, collecting unique values
- Saving and loading data with localStorage and JSON
- Styling with CSS, including classes and layouts for mobile
- Version control with Git and hosting with GitHub Pages

## How to use

1. Open the live demo on your phone or computer
2. Fill in the exercise, sets, reps and weight
3. Click **Save**

Tip: on your phone, use "Add to Home screen" in the browser menu to open it like an app.

> Note: data is saved in your browser, so each device keeps its own workout history.

## Ideas for the future

- Charts showing progress over time
- Editing a saved workout
- Syncing data between devices
