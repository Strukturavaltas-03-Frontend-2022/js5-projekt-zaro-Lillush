import { fetchUserData, updateUserData, updateOptions, url } from "./fetch.js";
import { validator } from "./validation.js";

const tableBody = document.querySelector(".tbody");
const addBtn = document.querySelector(".addBtn");
const cancelBtn = document.querySelector(".cancelBtn");
const nameInput = document.querySelector(".name");
const emailInput = document.querySelector(".email");
const addressInput = document.querySelector(".address");
const modalHeader = document.querySelector(".modal__header");
const modalBody = document.querySelector(".modal__body");
const modal = document.querySelector(".modal");
const modalInner = document.querySelector(".modal__inner");

let editButtons;
let deleteButtons;
let saveButtons;
let cancelButtons;

let userData;
let isValid = false;
let nameIsValid = false;
let emailIsValid = false;
let addressIsValid = false;

const createTable = async () => {
  userData = await fetchUserData(url);

  userData.forEach((item, i) => {
    const row = document.createElement("tr");
    row.classList.add("user");
    tableBody.appendChild(row);

    Object.values(item).forEach((value) => {
      const td = document.createElement("td");
      row.appendChild(td);
      td.textContent = value;
    });

    const actionTD = document.createElement("td");
    row.appendChild(actionTD);
    actionTD.innerHTML = `<button class="btn edit"><i class="fa fa-pencil" aria-hidden="true"></i></button> 
    <button class="btn delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
    <button style="display: none" class="btn save"><i class="fa fa-floppy-o" aria-hidden="true"></i></i></button> 
    <button style="display: none" class="btn cancel"><i class="fa fa-ban" aria-hidden="true"></i></i></button>`;

    editButtons = document.querySelectorAll(".edit");
    deleteButtons = document.querySelectorAll(".delete");
    saveButtons = document.querySelectorAll(".save");
    cancelButtons = document.querySelectorAll(".cancel");

    addEventListeners(i);
  });
};
createTable();

const addEventListeners = (index) => {
  const activeRow = deleteButtons[index].parentElement.parentElement;
  const activeID = activeRow.children[0].innerHTML;

  editButtons[index].addEventListener("click", () => {
    changeButtons(index);
    addBtn.disabled = true;
    nameInput.value = activeRow.children[1].innerHTML;
    emailInput.value = activeRow.children[2].innerHTML;
    addressInput.value = activeRow.children[3].innerHTML;
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  saveButtons[index].addEventListener("click", () => {
    const editedName = nameInput.value;
    const editedEmail = emailInput.value;
    const editedAddress = addressInput.value;

    isValid = validator(
      editedName,
      editedEmail,
      editedAddress,
      isValid
      // nameIsValid,
      // emailIsValid,
      // addressIsValid
    );

    if (isValid) {
      let editedUserObj = userData.find((user) => user.id == activeID);

      activeRow.children[1].innerHTML = editedName;
      activeRow.children[2].innerHTML = editedEmail;
      activeRow.children[3].innerHTML = editedAddress;

      editedUserObj = {
        id: activeID,
        name: editedName,
        email: editedEmail,
        address: editedAddress,
      };

      updateOptions.method = "PUT";
      updateOptions.body = JSON.stringify(editedUserObj);

      updateUserData(`${url}/${activeID}`, updateOptions);

      resetButtons(index);
      addBtn.disabled = false;
      allertMessage("Success", "User data was edited succesfully!");
    } else {
      allertMessage("Error", "One of the datas is not valid!");
    }
  });

  deleteButtons[index].addEventListener("click", () => {
    const activeRow = deleteButtons[index].parentElement.parentElement;
    activeRow.remove();
    updateOptions.method = "DELETE";
    updateUserData(`${url}/${activeID} `, updateOptions);
    userData = userData.filter((user) => !(user.id === index));
  });

  cancelButtons[index].addEventListener("click", () => {
    resetButtons(index);
    addBtn.disabled = false;
  });
};

addBtn.addEventListener("click", (e) => {
  const newUserName = nameInput.value;
  const newUserEmail = emailInput.value;
  const newUserAddress = addressInput.value;
  let maxID = 0;

  userData.forEach((user) => {
    if (user.id > maxID) {
      maxID = user.id;
    }
  });

  isValid = validator(
    newUserName,
    newUserEmail,
    newUserAddress
    // isValid,
    // nameIsValid,
    // emailIsValid,
    // addressIsValid
  );

  if (isValid) {
    e.preventDefault();
    const newUserObj = {
      id: maxID + 1,
      name: newUserName,
      email: newUserEmail,
      address: newUserAddress,
    };

    userData.push(newUserObj);

    updateOptions.method = "POST";
    updateOptions.body = JSON.stringify(newUserObj);
    updateOptions.headers = {
      "Content-Type": "application/json",
    };
    updateUserData(url, updateOptions);

    const newUserRow = document.createElement("tr");
    document.querySelector("tbody").appendChild(newUserRow);
    const newUserTemplate = `<td>${maxID + 1}</td><td>${
      newUserObj.name
    }</td><td>${newUserObj.email}</td><td>${newUserObj.address}</td>
    <td><button class="btn edit"><i class="fa fa-pencil" aria-hidden="true"></i></button> 
    <button class="btn delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
    <button style="display: none" class="btn save"><i class="fa fa-floppy-o" aria-hidden="true"></i></i></button> 
    <button style="display: none" class="btn cancel"><i class="fa fa-ban" aria-hidden="true"></i></i></button>`;
    newUserRow.innerHTML = newUserTemplate;

    editButtons = document.querySelectorAll(".edit");
    deleteButtons = document.querySelectorAll(".delete");
    saveButtons = document.querySelectorAll(".save");
    cancelButtons = document.querySelectorAll(".cancel");

    addEventListeners(userData.length - 1);

    nameInput.value = "";
    emailInput.value = "";
    addressInput.value = "";

    window.scrollTo({ top: 50000, behavior: "smooth" });

    allertMessage("Success", "New User added succesfully!");
  } else {
    allertMessage("Error", "One of the datas is not valid!");
  }
});

cancelBtn.addEventListener("click", () => {
  nameInput.value = "";
  emailInput.value = "";
  addressInput.value = "";
});

const changeButtons = (index) => {
  editButtons[index].style.display = "none";
  deleteButtons[index].style.display = "none";
  saveButtons[index].style.display = "inline-block";
  cancelButtons[index].style.display = "inline-block";

  editButtons.forEach((button, i) => {
    button.disabled = true;
    deleteButtons[i].disabled = true;
  });
};

const resetButtons = (index) => {
  editButtons[index].style.display = "inline-block";
  deleteButtons[index].style.display = "inline-block";
  saveButtons[index].style.display = "none";
  cancelButtons[index].style.display = "none";

  nameInput.value = "";
  emailInput.value = "";
  addressInput.value = "";

  editButtons.forEach((button, i) => {
    button.disabled = false;
    deleteButtons[i].disabled = false;
  });
};

const allertMessage = (type, message) => {
  modal.style.display = "flex";
  modalHeader.innerHTML = type;
  modalBody.innerHTML = message;

  if (isValid) {
    modalInner.style.border = "3px solid green";
    modalHeader.style.color = "green";
  } else {
    modalInner.style.border = "3px solid red";
    modalHeader.style.color = "red";
  }

  setTimeout(() => {
    clearTimeout();
    modal.style.display = "none";
  }, 4000);
};
