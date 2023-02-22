const API = "http://localhost:8000/contacts";
let name = document.querySelector(".inpName");
let surname = document.querySelector(".inpSurname");
let photo = document.querySelector(".inpPhoto");
let number = document.querySelector(".inpNumber");
let email = document.querySelector(".inpEmail");
let btnAdd = document.querySelector(".btn-add");
let ul = document.querySelector(".list-group");

let newContact = {};
getContact();
btnAdd.addEventListener("click", async () => {
  newContact = {
    name: name.value,
    surname: surname.value,
    photo: photo.value,
    number: number.value,
    email: email.value,
  };
  addContact();
  getContact();
});

async function addContact() {
  try {
    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(newContact),
    });
  } catch (error) {
    console.log(error);
  }
  name.value = "";
  surname.value = "";
  photo.value = "";
  number.value = "";
  email.value = "";
}
async function getContact() {
  try {
    let res = await fetch(API);
    let contacts = await res.json();
    render(contacts);
  } catch (error) {
    console.log(error);
  }
}
function render(newContact) {
  ul.innerHTML = "";
  newContact.forEach((item) => {
    ul.innerHTML += `
    <div class="card" style="width: 18rem;">
  <img src=${item.photo} class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${item.name}</h5>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">${item.surname}</li>
    <li class="list-group-item">${item.number}</li>
    <li class="list-group-item">${item.email}</li>
  </ul>
  <div class="card-body">
  <button onclick = "deleteContact(${item.id})" >delete</button>
  <button  onclick ="editContact(${item.id})" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
  </div>
</div>
    
    
    `;
  });
}

async function deleteContact(id) {
  try {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    getContact();
  } catch (error) {
    console.log(error);
  }
}

let inpEditName = document.querySelector(".inp-editName");
let inpEditSurname = document.querySelector(".inp-editSurname");
let inpEditPhoto = document.querySelector(".inp-editPhoto");
let inpEditNumber = document.querySelector(".inp-editNumber");
let inpEditEmail = document.querySelector(".inp-editEmail");

let inpEdit = document.querySelectorAll(".inpEdit");
let saveBtn = document.querySelector(".save-btn");
let editModal = document.querySelector("#exampleModal");
let editedObj = {};

function inpEditFc() {
  editedObj = {
    name: inpEditName.value,
    surname: inpEditSurname.value,
    photo: inpEditPhoto.value,
    number: inpEditNumber.value,
    email: inpEditEmail.value,
  };
}
console.log(editedObj);
// inpEditName.addEventListener("input", (e) => {
//   editedObj = { contacts: e.target.value };
// });

async function editContact(id) {
  try {
    let res = await fetch(`${API}/${id}`);
    let objToEdit = await res.json();

    // inpEdit.forEach((i) => {
    //   i.value = objToEdit[i.name];
    // });
    inpEditName.value = objToEdit.name;
    inpEditSurname.value = objToEdit.surname;
    inpEditPhoto.value = objToEdit.photo;
    inpEditEmail.value = objToEdit.email;
    inpEditNumber.value = objToEdit.number;

    saveBtn.setAttribute("id", `${id}`);
  } catch (error) {
    console.log(error);
  }
}

saveBtn.addEventListener("click", async (e) => {
  let id = e.target.id;
  inpEditFc();
  try {
    await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(editedObj),
    });
  } catch (error) {
    console.log(error);
  }
  getContact();
  let modal = bootstrap.Modal.getInstance(editModal);
  modal.hide();
});
