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

$('#submit').on("click", function(event){
  event.prevenDefault();//prevents hitting Enter and it going through. 

  var newTrain = $('#newTrain').val().trim();
  var newDestination = $('#newDestination').val().trim();
  var newFirstArrival = $('#firstArrival').val().trim();
  var newFrenquency = $('#newFrequency').val().trim();
  database.ref().push({
    newTrain: newTrain,
    newDestination: newDestination,
    newFirstArrival: newFirstArrival,
    newFrequency: newFrequency

  })

  $('.trainName').val("");
  $('.trainDestination').val("");
  $('.trainFrequency').val("");
// $('.nextArrival').val("");
// $('.minutesAway').val("");
})

database.ref().on('value', function(snapshot){
  $('#addTrainsHere').empty();
  snapshot.forEach(function(thisTrain){
    console.log(thisTrain);
    var tRow = $('<tr>');
    // var tTrainName = $('<td>').text(thisTrain.val().newTrain);
    // var tDestination = $('<td>').text(thisEmployee.val().newDestination);
    // var t = $('<td>').text(thisEmployee.val().newFreq);
    // var tFrequency = $('<td>').text(thisEmployee.val().newFrequestion);
    tRow.append()
  })
})

