async function GetData(){
    var uid = localStorage.getItem("userUid")

    var stats_categories = document.getElementById("stats-categories")


    await firebase.database().ref("category").get().then((db)=>{
        console.log(db.val())
        var productlength = Object.values(db.val()).length
        console.log(productlength)
        stats_categories.innerText=productlength
    })
    .catch((Err)=>{
        console.log(Err)
    })

}

GetData()