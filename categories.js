document.getElementById("sidebar-container").innerHTML = getSidebar();

// let categories = getData("categories");
const tableBody = document.getElementById("table-body");
const modal = document.getElementById("modal");
const modalForm = document.getElementById("modal-form");
var categoryName = document.getElementById("cat-name");
var categoryCount = document.getElementById("cat-count");
var saveBtn = document.getElementById("saveBtn");
var key = "";

// 40
// 41

async function SaveDb() {
  event.preventDefault();
  var key = await firebase.database().ref("category").push(catObject).getKey();

  var catObject = {
    categoryName: categoryName.value,
    categoryCount: categoryCount.value,
    categoryKey: key,
  };
  console.log(catObject);

  try {
    await firebase.database().ref("category").child(key).set(catObject);
    modal.classList.remove("active");
    alert("add new category");
    getAllCatefory();
  } catch (err) {
    modal.classList.remove("active");
  }

  //
}
async function openModal(id = null) {
  console.log(id);
  if (id == null) {
    document.getElementById("modal-title").textContent = "Add Category";
    saveBtn.setAttribute("onclick", `SaveDb()`);
    categoryName.value = "";
    categoryCount.value = "";
    saveBtn.innerText = "Save";
    key = "";
  } else {
    await firebase
      .database()
      .ref("category")
      .child(id)
      .get()
      .then((data) => {
        console.log(data.val());
        categoryName.value = data.val()["categoryName"];
        categoryCount.value = data.val()["categoryCount"];
        key = data.val()["categoryKey"];
        saveBtn.innerText = "Update";
        saveBtn.setAttribute("onclick", `UpdateBtn()`);
      })
      .catch((E) => {
        console.log(E);
      });
    document.getElementById("modal-title").textContent = "Edit Category";
  }
  modal.classList.add("active");
}

async function UpdateBtn() {
  //   alert();
  event.preventDefault();

  console.log(key);
  var catObject = {
    categoryName: categoryName.value,
    categoryCount: categoryCount.value,
    categoryKey: key,
  };
  console.log(catObject);
  await firebase.database().ref("category").child(key).set(catObject);
  alert("update ");
  getAllCatefory();
  modal.classList.remove("active");
}

function closeModal() {
  modal.classList.remove("active");
}

async function getAllCatefory() {
  //
  await firebase
    .database()
    .ref("category")
    .get()
    .then((catDB) => {
      console.log(catDB.val()); //convert into read form user
      if(catDB.val()==null){
         tableBody.innerHTML = "<h1>No Data</h1>";
        return

      }
      var data = Object.values(catDB.val());
      console.log(data);
      tableBody.innerHTML = "";
      for (var i = 0; i < data.length; i++) {
        tableBody.innerHTML += `
             <tr>
                    <td>${i+1}</td>
                     <td>${data[i].categoryName}</td>
                    <td>${data[i]["categoryCount"]}</td>
                     <td>
                    
                       <button class="action-btn" onclick=edit('${data[i][
                         "categoryKey"
                       ].toString()}') >Edit</button>
                       <button class="action-btn delete-btn"  onclick=deleteCat('${data[
                         i
                       ]["categoryKey"].toString()}')>Delete</button>
                   </td>
               </tr>
            
            `;
      }
    })
    .catch((Err) => {
      console.log(Err);
    });
}
getAllCatefory();

async function deleteCat(id) {
  console.log(id);
  try {
    await firebase.database().ref("category").child(id).remove();
    alert("delete category");
    getAllCatefory()
  } catch (E) {
    console.log(E);
  }
}

function edit(id) {
  //   alert("test");
  console.log(id);
  openModal(id);
}

// function render() {
//   tableBody.innerHTML = categories
//     .map(
//       (cat) => `
//                 <tr>
//                     <td>#${cat.id}</td>
//                     <td>${cat.name}</td>
//                     <td>${cat.count}</td>
//                     <td>
//                         <button class="action-btn edit-btn" onclick="edit(${cat.id})">Edit</button>
//                         <button class="action-btn delete-btn" onclick="del(${cat.id})">Delete</button>
//                     </td>
//                 </tr>
//             `
//     )
//     .join("");
// }

// render();

// async function openModal(id = null) {
// //   document.getElementById("edit-id").value = id || "";
//   document.getElementById("modal-title").textContent = "Add Category"
// //   var key =  await firebase.database().ref("category").push().getKey()

//     modalForm.reset();

//     // ? "Edit Category"
//     // : "Add Category";
// //   if (id) {
// //     const cat = categories.find((c) => c.id === id);
// //     document.getElementById("cat-name").value = cat.name;
// //     document.getElementById("cat-count").value = cat.count;
// //   } else {
// //     modalForm.reset();
// //   }
//   modal.classList.add("active");
// }

// function del(id) {
//   if (confirm("Are you sure?")) {
//     categories = categories.filter((c) => c.id !== id);
//     setData("categories", categories);
//     render();
//   }
// }

// modalForm.onsubmit = (e) => {
//   e.preventDefault();
//   const id = document.getElementById("edit-id").value;
//   const name = document.getElementById("cat-name").value;
//   const count = document.getElementById("cat-count").value;

//   if (id) {
//     const index = categories.findIndex((c) => c.id == id);
//     categories[index] = { id: parseInt(id), name, count: parseInt(count) };
//   } else {
//     const newId =
//       categories.length > 0 ? Math.max(...categories.map((c) => c.id)) + 1 : 1;
//     categories.push({ id: newId, name, count: parseInt(count) });
//   }
//   setData("categories", categories);
//   render();
//   closeModal();
// };
