  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBwB6UlpxIaiR92Mce9Ebx_E86-2L84Ync",
    authDomain: "hoptoit-5dfeb.firebaseapp.com",
    databaseURL: "https://hoptoit-5dfeb.firebaseio.com",
    projectId: "hoptoit-5dfeb",
    storageBucket: "hoptoit-5dfeb.appspot.com",
    messagingSenderId: "413298654254"
  };
  firebase.initializeApp(config);
  var db = firebase.database();
  var users = db.ref("/users");
  
// start firebase listeners

db.ref().on("value", function(snap) {
  var user = snap.child("users").val();
  console.log(user);
});


//start functions 

function checkUser(user, password) {
  db.ref("/users").child(user).once('value', function (snapshot) {
      if (snapshot.exists()) {
          alert("this user already exists, please make a new one or refresh and login"); // we're not supposed to use these
      }
      else {
          db.ref("/users").child(user).set({ pwrd: password, lists: "none", pastLists: "none", listCount: 0 });
          sessionStorage.l = user;
          sessionStorage.p = password;
          sessionStorage.listCount = 0;
      }

  });
};// end checkUser function for signing up for new users.
function login(user, password) {
  db.ref("/users").child(user).once('value', function (snapshot) {
      if (snapshot.exists() && snapshot.val().pwrd == password) {
          db.ref("/users").child(user).set({ pwrd: password, listCount:snapshot.child("listCount").val(), pastLists:snapshot.child("pastLists").val(), lists: snapshot.child("lists").val()});
          sessionStorage.l = user;
          sessionStorage.p = password;
          sessionStorage.listCount = snapshot.child("listCount").val();
      } else { alert("please enter correct username and password"); } // we're not supposed to use these
  });
};// end login function to check password if user exists
function addList (user, name, location) {
  db.ref("/users").child(user).once('value', function(snap) {
    var lCount = snap.child("listCount").val();
    var newLc = lCount + 1; 
    db.ref("users").child(user).child("lists").child("list" +newLc).set({name: name, location: location});
    db.ref("users").child(user).child("listCount").set(newLc);
    console.log(lCount);
  });
};// end addList function this will only log on the initial creation of the list; not adding items.
function addItem (user, listNum, itemName, itemLocation) {
  db.ref("/users").child(user).once('value', function(snap) {
    var totalLists = snap.child("listCount").val();
    db.ref("/users").child(user).child("lists").child("list"+listNum).child(itemName).set(itemLocation);
  });
};// end add item function, called when adding items, requires 4 parameters.

// start global variables for ajax to google maps API's

//on click for log-in button on splash page
$(document).on("click", "#loginBTN", function () {
  console.log($(this)[0]);
  console.log("^this was clicked");
});

//on click for sign-up button on splash page
$(document).on("click", "#signUpBTN", function () {
  console.log($(this)[0]);
  console.log("^this was clicked");
});

//on click for log-in button on login page
$(document).on("click", "#login", function () {
  console.log($(this)[0]);
  console.log("^this was clicked");
});

//on click for sign-up button on login page
$(document).on("click", "#signup", function () {
  console.log($(this)[0]);
  console.log("^this was clicked");
});

//on click for add button on google maps page
$(document).on("click", "#add-btn", function () {
  console.log($(this)[0]);
  console.log("^this was clicked");
});

// gets location and uses a button to convert to address in console.
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    console.log(pos.lat)
    console.log(pos.lng)
    $("#button").on('click', function(yeehaw){
var lat = pos.lat;
var lng = pos.lng;
var key = "&key=AIzaSyA11oEIx4XjMpFyLNIs1-QKl7ENcRYVoe0"
var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+ lat + "," + lng + key ;
console.log(queryURL)

 $.ajax({
url: queryURL,
method: "GET"
})
.then(function(response) {
  console.log(response);
  console.log(response.results[0].formatted_address);
  sessionStorage.setItem(response.results[0].formatted_address)
  
  });
})
})
}
