document.getElementById("sidebar-container").innerHTML = getSidebar();

var modal = document.getElementById("modal");
var modalForm = document.getElementById("modal-form");
var catSelect = document.getElementById("prod-cat");
var file = document.getElementById("file")



// Fill category select

function openModal(id = null) {
  document.getElementById("edit-id").value = id || "";
  document.getElementById("modal-title").textContent = id
    ? "Edit Product"
    : "Add Product";
  if (id) {
    const p = products.find((prod) => prod.id === id);
    document.getElementById("prod-name").value = p.name;
    document.getElementById("prod-cat").value = p.category;
    document.getElementById("prod-price").value = p.price;
  } else {
    modalForm.reset();
  }
  modal.classList.add("active");
}

function closeModal() {
  modal.classList.remove("active");
}

function edit(id) {
  openModal(id);
}

function del(id) {
  if (confirm("Are you sure?")) {
    products = products.filter((p) => p.id !== id);
    setData("products", products);
    render();
  }
}

modalForm.onsubmit = (e) => {
  e.preventDefault();
  const id = document.getElementById("edit-id").value;
  const name = document.getElementById("prod-name").value;
  const category = document.getElementById("prod-cat").value;
  const price = document.getElementById("prod-price").value;

  if(file.files.length==0){
    alert("please select product image")

  }
  else{
//   console.log(file.files[0]/1024/1024)


  }

//   if (id) {
//     const index = products.findIndex((p) => p.id == id);
//     products[index] = {
//       id: parseInt(id),
//       name,
//       category,
//       price: parseInt(price),
//     };
//   } else {
//     const newId =
//       products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
//     products.push({ id: newId, name, category, price: parseInt(price) });
//   }
//   setData("products", products);

//   closeModal();
};


async function getCategory(){
    await firebase.database().ref("category").get().then((snapproducts)=>{
        var valuesDb = Object.values(snapproducts.val())
        console.log(valuesDb)
        for(var i=0;i<valuesDb.length;i++){
            console.log(valuesDb[i]["categoryName"])
            catSelect.innerHTML+=`
            <option value='${valuesDb[i]["categoryName"]+":"+valuesDb[i]["categoryKey"]}' >${valuesDb[i]["categoryName"]}</option>
            `
        }

        
       
    })
    .catch((e)=>{
        console.log(e)
    })

}

getCategory()


console.log(firebase.database())

