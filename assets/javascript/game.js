var config = {
  apiKey: "AIzaSyC_0B5EuCQSs3M3vTFkSkwt5oWweP71rx4",
  authDomain: "train-scheduler-3208d.firebaseapp.com",
  databaseURL: "https://train-scheduler-3208d.firebaseio.com",
  projectId: "train-scheduler-3208d",
  storageBucket: "train-scheduler-3208d.appspot.com",
  messagingSenderId: "841752497324"
};


firebase.initializeApp(config);

var database = firebase.database();
// alert ("test everything");
$('#submit').on("click", function (event) {
  event.preventDefault(); //prevents hitting Enter and it going through. 

  var newTrain = $('#newTrain').val().trim();
  var newDestination = $('#newDestination').val().trim();
  var newFirstArrival = $('#firstArrival').val().trim();
  var newFrequency = $('#newFrequency').val().trim();
  //help with tutor Number.isInteger()



  var workingArrival = parseInt(newFirstArrival.replace(":", "")); //it returns it as a string"" and we need to change to a number so boolean can verify
  var workingFrequency = parseInt(newFrequency);
  var hasData = (newTrain.length && newDestination.length && newFirstArrival.length && newFrequency.length) ? true : false;
  var isNumber = (Number.isInteger(workingArrival) && Number.isInteger(workingFrequency)) ? true : false; //replace() javascript method on string - tutor time :)
  var numberLengthArrival = (workingArrival <= 2400); // this is the max military time 
  var numberLengthFrequency = (workingFrequency <= 1440); // this is a max frequency you can have in 24 hrs. 
  if (hasData && isNumber && numberLengthArrival && numberLengthFrequency) { //verifying before pushing to database
    database.ref().push({
      newTrain: newTrain,
      newDestination: newDestination,
      newFirstArrival: newFirstArrival,
      newFrequency: newFrequency
    })

    $('#newTrain').val("");
    $('#newDestination').val("");
    $('#firstArrival').val("");
    $('#newFrequency').val("");
  } else {
    alert("silly rabbit ... fill it out correctly.")
  }
  return false; //prevents page from refreshing. You do not want to know how long it took me to remember/find this.. facepalm
});


database.ref().on('value', function (snapshot) {
  $('#tableBody').empty();

  snapshot.forEach(function (thisTrain) {
    console.log(thisTrain.val());
    // var tRow = $('<tr>');
    //define variable from firebase
    var tTrainName = thisTrain.val().newTrain;
    var tDestination = thisTrain.val().newDestination;
    var tFirstArrival = thisTrain.val().newFirstArrival;
    var tFrequency = thisTrain.val().newFrequency;
    // var t = "word";
    var trainTime;
    var nextArrival;
    var minutesRemaining;
    var hrs;
    var mins;
    var timeArray;
    var timeCheck;

    //manipulate time vairables
    timeArray = tFirstArrival.split(":");
    hrs = timeArray[0];
    mins = timeArray[1];
    trainTime = moment().hours(hrs).minutes(mins);
    timeCheck = moment().max(moment(), trainTime);// store which is greater. 
    console.log(timeCheck);
    //compare first arrival to current time
    if (trainTime === timeCheck) {
      // what this means is the timeCheck, which is the greater of the 2
      //current time and trainTime,  is equal to the traintime meaning it is the next arrival time. 
      //it means the next arrival time is the first arrival time
      nextArrival = trainTime.format("hh:mm A");// hh:mm A is just the format how we want it to return
      minutesRemaining = trainTime.diff(moment(), "minutes") //want to return it in minutes which is a string
    }

    newRow = $("<tr>");
    thisTrainName = $("<td>").text(tTrainName);
    thisTrainDestination = $("<td>").text(tDestination);
    thisTrainFrequency = $("<td>").text(tFrequency);
    thisFirstArrival = $("<td>").text(tFirstArrival);
    thisNextTrainArrival = $('<td>').text(nextArrival);
    thisMinutesRemaining = $('<td>').text(minutesRemaining);

    newRow.append(thisTrainName, thisTrainDestination, thisTrainFrequency, thisNextTrainArrival, thisMinutesRemaining);

    $("#tableBody").append(newRow);

    //do calculation to find next train if first train has already come
    //append to page
    // replace the last 2 <td>${t}</td>
    //add classes  class="text-white font-weight-bolder " to the new <td> as well to keep uniform look
    // tutor recommended this method. 
    // var html = `<tr>
  
    //   <td>${tTrainName}</td>
    //   <td>${tDestination}</td>
    //   <td>${tFrequency}</td>
    //   <td>${nextArrival}</td>
    //   <td >${minutesRemaining}</td> 
    //   </tr>`
    // $('#addHere').append(html)
  })
})
//from class lecture recent-all-users-solved.html
// dataRef.ref().on("child_added",function(childSnapshot){
// log everything that's coming out of snapshot
// console.log(childSnapshot).val().name);
// console.log(childSnapshot).val().email);
// console.log(childSnapshot).val().age);
// console.log(childSnapshot).val().comment);
// console.log(childSnapshot).val().joinDate);
// }), function(errorObject) {
// console.log("errors handled: " + errorObject.code);
// }

//the dots means chaining!
// DataTransfer.ref()
// .orderByChild("dateAdded")
// // .limitToLast(1)
// .on("child_added", funciton(){
    // $("#name-display").text(snapshot.val().name);
    // $("#name-display").text(snapshot.val().email);
    // $("#name-display").text(snapshot.val().age);
    // $("#name-display").text(snapshot.val().comment);

// })