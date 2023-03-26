
// Global Vars 
const dateDisplay = $("#currentDay");
const btns = $(".btn")
const hourRows = $(".hour");

/* Wrap all code that interacts with the DOM in a call to jQuery to ensure that 
the code isn't run until the browser has finished rendering all the elements
in the html. */

$(function () {
  init();

  // on-page-load function
  function init() {
    // displays current date to top of page
    dateDisplay.text(dayjs().format("MM/DD/YYYY"));

    // get current hour
    var currHour = dayjs().hour();
    
    // add class based on row id compared to current hour
    for (const row of hourRows) {
      // takes row id and slices to create int for comparison
      var currRowHr = parseInt($(row).parent().prop("id").slice(5));
      // if current hour matches row id, set class to present
      if (currRowHr === currHour) {
        $(row).parent().addClass("present");
      // if current hour is greater than row id, set class to future
      } else if(currRowHr > currHour) {
        $(row).parent().addClass("future");
      }
      // final option: set class to past
      else {
        $(row).parent().addClass("past");
      }
    }
    
    // load saved data; if none exists, create empty array
    var workDaySchArr = JSON.parse(localStorage.getItem("workDaySchedule")) || [];

    // loop through local data and set value in .description elements to match
    for (const event of workDaySchArr) {
      $('#hour-' + event.time).children(".description").val(event.event)
    }
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
    //get saved schedule
    var workDaySchArr = JSON.parse(localStorage.getItem("workDaySchedule")) || [];
    // create new object with time based on element id and "event" entered into input field
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
