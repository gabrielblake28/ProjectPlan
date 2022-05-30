let workoutArray = [];

let workoutObject = function (
  bodyType,
  workoutType,
  workoutIntensity,
  workoutDuration
) {
  this.bodyType = bodyType;
  this.workoutType = workoutType;
  this.workoutIntensity = workoutIntensity;
  this.workoutDuration = workoutDuration;
  this.ID = Math.random().toString(16).slice(5);
};

workoutArray.push(new workoutObject("Man", "Treadmill", 3, 45));
workoutArray.push(new workoutObject("Woman", "Yoga", 3, 60));
workoutArray.push(new workoutObject("Man", "Strength training", 3, 75));

document.addEventListener("DOMContentLoaded", function () {
  createList();

  // add button events ************************************************************************

  document.getElementById("addBtn").addEventListener("click", function () {
    workoutArray.push(
      new workoutObject(
        document.getElementById("body-type").value,
        document.getElementById("workout-type").value,
        document.getElementById("intensity").value,
        document.getElementById("workout-duration-input").value
      )
    );
  });
  // document.location.href = "index.html#ListAll";
  // also add the URL value

  // page before show code *************************************************************************
  $(document).on("pagebeforeshow", "#show", function (event) {
    // have to use jQuery
    createList();
  });

  // need one for our details page to fill in the info based on the passed in ID
  $(document).on("pagebeforeshow", "#details", function (event) {
    console.log(localStorage);
    let workoutID = localStorage.getItem("parm"); // get the unique key back from the storage dictionairy
    let workoutTitle = localStorage.getItem("title");
    let workoutIntensity = localStorage.getItem("intensity");
    let workoutDuration = localStorage.getItem("duration");
    document.getElementById("workout-id").innerHTML = workoutID;
    document.getElementById(
      "workout-title"
    ).innerHTML = `Workout Type: ${workoutTitle}`;
    document.getElementById(
      "workout-intensity"
    ).innerHTML = `Workout Intensity (1-5): ${workoutIntensity}`;
    document.getElementById(
      "workout-duration"
    ).innerHTML = `Workout Duration(in minutes): ${workoutDuration}`;
  });

  // end of page before show code *************************************************************************
});

function createList() {
  // clear prior data
  let theList = document.getElementById("myul");
  theList.innerHTML = "";

  workoutArray.forEach(function (element, i) {
    // use handy array forEach method
    var myLi = document.createElement("li");
    myLi.classList.add("workout-link");
    myLi.innerHTML =
      element.workoutType + ":  " + element.workoutDuration + " mins";

    // use the html5 "data-parm" to store the ID of this particular workout object
    // that we are currently building an li for so that I can later know which workout this li came from
    myLi.setAttribute("data-parm", element.ID);
    myLi.setAttribute("workout-title", element.workoutType);
    myLi.setAttribute("workout-intensity", element.workoutIntensity);
    myLi.setAttribute("workout-duration", element.workoutDuration);

    theList.appendChild(myLi);

    var liList = document.getElementsByClassName("workout-link");

    let newWorkoutArray = Array.from(liList);

    newWorkoutArray.forEach(function (element, i) {
      element.addEventListener("click", function () {
        var parm = this.getAttribute("data-parm");
        let title = this.getAttribute("workout-title");
        // var duration = this.getAttribute("workout-duration");
        var intensity = this.getAttribute("workout-intensity");
        var duration = this.getAttribute("workout-duration");

        localStorage.setItem("title", title);
        localStorage.setItem("parm", parm);
        localStorage.setItem("intensity", intensity);
        localStorage.setItem("duration", duration);
        document.location.href = "index.html#details";
      });
    });
  });
}
