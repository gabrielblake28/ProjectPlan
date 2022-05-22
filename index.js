let workoutArray = [];

let workoutObject = function (bodyType, workoutType, intensity, duration) {
  this.bodyType = bodyType;
  this.workoutType = workoutType;
  this.intensity = intensity;
  this.duration = duration;
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
        document.getElementById("workout-duration").value
      )
    );
    console.log(workoutArray);
    // document.location.href = "index.html#ListAll";
    // also add the URL value

    // page before show code *************************************************************************
    $(document).on("pagebeforeshow", "#show", function (event) {
      // have to use jQuery
      createList();
    });

    // need one for our details page to fill in the info based on the passed in ID
    $(document).on("pagebeforeshow", "#info", function (event) {
      let workoutID = localStorage.getItem("parm"); // get the unique key back from the storage dictionairy
      document.getElementById("thatMovieID").innerHTML = MovieID;
    });

    // end of page before show code *************************************************************************
  });
});

function createList() {
  // clear prior data
  let theList = document.getElementById("myul");
  theList.innerHTML = "";

  workoutArray.forEach(function (element, i) {
    // use handy array forEach method
    const myLi = document.createElement("li");
    myLi.classList.add("workout-link");
    myLi.innerHTML = element.workoutType + ":  " + element.duration + " mins";

    // use the html5 "data-parm" to store the ID of this particular movie object
    // that we are currently building an li for so that I can later know which movie this li came from
    myLi.setAttribute("data-parm", element.ID);

    theList.appendChild(myLi);
  });
}
