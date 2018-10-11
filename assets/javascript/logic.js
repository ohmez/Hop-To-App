

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

  })
};// end checkUser function for signing up for new users.
function login(user, password) {
  db.ref("/users").child(user).once('value', function (snapshot) {
      if (snapshot.exists() && snapshot.val().pwrd == password) {
          db.ref("/users").child(user).set({ pwrd: password, listCount:snapshot.child("listCount").val(), pastLists:snapshot.child("pastLists").val(), lists: snapshot.child("lists").val()});
          sessionStorage.l = user;
          sessionStorage.p = password;
          sessionStorage.listCount = snapshot.child("listCount").val();
      } else { alert("please enter correct username and password"); } // we're not supposed to use these
  })
};// end login function to check password if user exists