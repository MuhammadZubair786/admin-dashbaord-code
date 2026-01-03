document.getElementById("sidebar-container").innerHTML = getSidebar();

var modal = document.getElementById("modal");
var modalForm = document.getElementById("modal-form");
var catSelect = document.getElementById("prod-cat");
var file = document.getElementById("file");
var table_body = document.getElementById("table-body");

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

async function uploadImage() {
  const formdata = new FormData();
  formdata.append("file", file.files[0]);
  formdata.append("upload_preset", "CLASS_3_5_STORAGE");
  formdata.append("asset_folder", "ECOM APP");

  var imageUrl = "";

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  await fetch(
    "https://api.cloudinary.com/v1_1/dgbkoycyp/image/upload",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result.secure_url);
      imageUrl = result.secure_url;
    })
    .catch((error) => {
      console.error(error);
      imageUrl = "";
    });

  return imageUrl;
}

modalForm.onsubmit = async (e) => {
  e.preventDefault();
  const id = document.getElementById("edit-id").value;
  const name = document.getElementById("prod-name").value;
  const category = document.getElementById("prod-cat").value;
  const price = document.getElementById("prod-price").value;

  //   split,join

  if (file.files.length == 0) {
    alert("please select product image");
  } else {
    console.log(file.files[0]);
    var imageUrl = await uploadImage();
    console.log(imageUrl);
    console.log(category);
    var cat = category.split(":");

    var productKey = await firebase.database().ref("Products").push().getKey();

    var Object = {
      catKey: cat[1],
      catValue: cat[0],
      productName: name,
      price: price,
      imageUrl: imageUrl,
      productKey: productKey,
    };
    console.log(Object);
    await firebase.database().ref("Products").child(productKey).set(Object);
    alert("add new product");
    getProducts();
    closeModal();
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

async function getProducts() {
     table_body.innerHTML=""
  await firebase
    .database()
    .ref("Products")
    .get()
    .then((snapproducts) => {
      console.log(snapproducts.val());
      var products = Object.values(snapproducts.val());
      console.log(products);

      for (var i = 0; i < products.length; i++) {
        console.log(products[i]);
        table_body.innerHTML += `
 <tr>
                            <th>${i + 1}</th>
                            <th>${products[i]["productName"]}</th>
                             <th>${products[i]["catValue"]}</th>
                               <th>${products[i]["price"]}</th>
                               <th>
                               <img src='${products[i]["imageUrl"]}'/>
                               </th>

                               <th>
                                  <button>Edit</button>
                            <button>Delete</button></th>
                         

                        </tr>
                    </thead>
    
        
        `;
      }
    })
    .catch((E) => {
      console.log(E);
    });
}
async function getCategory() {
  await firebase
    .database()
    .ref("category")
    .get()
    .then((snapproducts) => {
      var valuesDb = Object.values(snapproducts.val());
      console.log(valuesDb);
      for (var i = 0; i < valuesDb.length; i++) {
        console.log(valuesDb[i]["categoryName"]);
        catSelect.innerHTML += `
            <option value='${
              valuesDb[i]["categoryName"] + ":" + valuesDb[i]["categoryKey"]
            }' >${valuesDb[i]["categoryName"]}</option>
            `;
      }
    })
    .catch((e) => {
      console.log(e);
    });
}

getCategory();
getProducts();

console.log(firebase.database());
