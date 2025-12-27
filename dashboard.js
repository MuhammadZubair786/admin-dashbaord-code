async function GetData(){
    var uid = localStorage.getItem("userUid")


    await firebase.database().ref("Users").child(uid).get().then((db)=>{
        console.log(db.val())
    })
    .catch((Err)=>{
        console.log(Err)
    })

}

GetData()