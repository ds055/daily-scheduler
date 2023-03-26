
// Global Vars 
const dateDisplay = $("#currentDay");
const btns = $(".btn")
const hourRows = $(".hour");

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  init();

  function init() {
    // Displays current date to top of page
    dateDisplay.text(dayjs().format("MM/DD/YYYY"));

      // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
    


  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  
  
  }


  // event handler
  btns.on("click", saveSchedule);


  function saveSchedule(event) {
    //button clicked
    const btnClicked = event.target;

    //get parent time-block, get id, trim for just number
    const schHour = $(btnClicked).closest(".time-block").prop("id").slice(5);

    // get text from input area
    const schEvent = $(btnClicked).siblings(".description").val() || $(btnClicked).parent().siblings(".description").val();
    console.log(schEvent)

    //get saved schedule
    var workDaySchArr = JSON.parse(localStorage.getItem("workDaySchedule")) || [];

    // create new object with players inputted initials and scores
    var newEvent = {
        time: parseInt(schHour),
        event: schEvent
    };

    // if object for given time already exists, delete and make room for new time
    var workDaySchArr = $.grep(workDaySchArr, function(obj){
      return obj.time != newEvent.time;
    })

    // add new object to array
    workDaySchArr.push(newEvent);

    // place new array in local storage
    localStorage.setItem("workDaySchedule", JSON.stringify(workDaySchArr));
  }

  

});
