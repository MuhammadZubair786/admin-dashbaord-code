async function signup() {
    alert("test")
    event.preventDefault()
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async(userCredential) => {
      // Signed in
      var user = userCredential.user;
      var object = {
        name,email,password
      }

     await firebase.database().ref("Users").child(user.uid).set(object)
     alert("signup user")
     window.location.href="login.html"     // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage)
      // ..
    });
}
