
let editButton = document.querySelector("#edit-button");
let saveButton = document.querySelector(".popup__save-button");
let closeButton = document.querySelector("#close-button");
let formElement = document.querySelector(".popup__form");

function openPopUp() {
    let popup = document.querySelector(".popup");
    popup.classList.add("popup__opened");
}

function closePopUp() {
    let popup = document.querySelector(".popup");
    popup.classList.remove("popup__opened");

    document.querySelector("#name").value = "";
    document.querySelector("#about").value = "";
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    let nameInput = document.querySelector("#name").value;
    let aboutInput = document.querySelector("#about").value;
    let userName = document.querySelector(".profile-info__name");
    let userAbout = document.querySelector(".profile-info__explore");

    userName.textContent = nameInput;
    userAbout.textContent = aboutInput;

    closePopUp();
}

editButton.addEventListener("click", openPopUp);
closeButton.addEventListener("click", closePopUp);
formElement.addEventListener("submit", handleProfileFormSubmit);