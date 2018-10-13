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
var lat = 40;
var lng = -111;
var key = "&key=AIzaSyA11oEIx4XjMpFyLNIs1-QKl7ENcRYVoe0"
var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+ lat + "," + lng + key ;
console.log(queryURL)

 $.ajax({
url: queryURL,
method: "GET"
}).then(function(response) {
  console.log(response);
  console.log(response.results[0].formatted_address);  
});

// start on click function listeners - libby you're to make these for splash and login atleast; communicate with others to make sure if you want to do more. 
//here is an example of what we need
$(document).on("click", "#loginBTN", function () {
  // script to be added after on clicks working
  console.log($(this)[0]);
  console.log("^this was clicked");
});// end singup function for new user populates new login content