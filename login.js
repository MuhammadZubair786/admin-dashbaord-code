async function loginIn() {

    event.preventDefault()

  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async(userCredential) => {
      // Signed in
      var user = userCredential.user;
      localStorage.setItem("adminLogin",true)
      localStorage.setItem("userUid",userCredential.user.uid)
    
     alert("Login user")
     window.location.href="dashboard.html"     // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage)
      // ..
    });
}

function checkUser(){
    var loginStatus = localStorage.getItem("adminLogin")
    if(loginStatus=="true"){
        window.location.href="dashboard.html"

    }

}

checkUser()