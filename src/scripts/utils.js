import { addCard } from './index.js';
import UserInfo from './UserInfo.js';

const userInfo = new UserInfo({
    nameSelector: '.profile-info__name',
    infoSelector: '.profile-info__explore'
});

export function openPopUp(modalId) {
    const popup = document.querySelector(`#${modalId}`);
    popup.classList.add("popup__opened");
}

export function closePopUp(modalId) {
    const popup = document.querySelector(`#${modalId}`);
    popup.classList.remove("popup__opened");
}

export function openImagePopUp(link, name) {
    const imageModal = document.querySelector("#image-modal");
    const imageModalImage = imageModal.querySelector(".popup-photo__image");
    const popupImageCaption = imageModal.querySelector(".popup-photo__title");

    imageModalImage.src = link;
    imageModalImage.alt = name;
    popupImageCaption.textContent = name;
    openPopUp("image-modal");
}

export function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const nameInput = document.querySelector("#name").value;
    const aboutInput = document.querySelector("#about").value;

    userInfo.setUserInfo({
        name: nameInput,
        info: aboutInput
    });

    closePopUp("edit-modal");
}

const editFormElement = document.querySelector("#edit-form");
if (editFormElement) {
    editFormElement.addEventListener("submit", handleProfileFormSubmit);
}

export function handleAddFormSubmit(evt) {
    evt.preventDefault();

    const localName = document.querySelector("#local-name").value;
    const localImage = document.querySelector("#local-image").value;

    if (localName && localImage) {
        addCard({ name: localName, link: localImage });
        closePopUp("add-modal");
        evt.target.reset();
    }
}
