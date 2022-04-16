var firebaseConfig = {
    apiKey: "AIzaSyD3SpH24MmDP4IroMIoMYkncZjxb0VGa0c",
    authDomain: "kwitter-f2dcb.firebaseapp.com",
    databaseURL: "https://kwitter-f2dcb-default-rtdb.firebaseio.com",
    projectId: "kwitter-f2dcb",
    storageBucket: "kwitter-f2dcb.appspot.com",
    messagingSenderId: "1297791914",
    appId: "1:1297791914:web:94e59a15083668c5b909d3",
    measurementId: "G-S3RN2B9LL5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome" + user_name + "!";

function addRoom() {
    room_name = document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({ purpose: "adding room name" });
    localStorage.setItem("room_name", room_name);
    window.location = "kwitter_page.html";
}

function getData() {
    firebase.database().ref("/").on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            console.log("Room Name - " + Room_names);
            row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
            document.getElementById("output").innerHTML += row;
        });
    });
}
getData();

function redirectToRoomName(name) {
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html"
}