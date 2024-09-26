import { openPopUp, closePopUp, openImagePopUp, handleProfileFormSubmit, handleAddFormSubmit } from './utils.js';
import Card from './Card.js';
import { FormValidator } from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js'; 
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import "../pages/index.css"

const initialCards = [
    {
      name: "Vale de Yosemite",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
    },
    {
      name: "Lago Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
    },
    {
      name: "Montanhas Carecas",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
    },
    {
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
    },
    {
      name: "Parque Nacional da Vanoise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
    },
    {
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
    }
];


const localButton = document.querySelector("#local-button");
const closeButton = document.querySelector("#close-button");
const closeAddButton = document.querySelector("#close-add-button");
const editFormElement = document.querySelector("#edit-form");
const addFormElement = document.querySelector("#add-form");
const cardsContainer = document.querySelector(".cards");
const closeImagePopupButton = document.querySelector(".popup-photo__close-button");


const imagePopup = new PopupWithImage('#image-modal');
const userInfo = new UserInfo({
  nameSelector: '.profile-info__name',
  infoSelector: '.profile-info__explore'
});

const editPopup = new PopupWithForm('#edit-modal', (formData) => {
  userInfo.setUserInfo(formData);
  editPopup.close();
});

const addPopup = new PopupWithForm('#add-modal', (formData) => {
  addCard(formData); 
  addPopup.close();
});


editPopup.setEventListeners();
addPopup.setEventListeners();

// Abertura de popups
document.querySelector('.profile__button-add').addEventListener('click', () => {
  imagePopup.open('https://example.com/image.jpg', 'Descrição da Imagem');
});

const editButton = document.querySelector('#edit-button');
const addButton = document.querySelector('#local-button');

editButton.addEventListener('click', () => {
  editPopup.open();
});

addButton.addEventListener('click', () => {
  addPopup.open();
});


function createCard(item) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector('.cards__image');
  const cardTitle = cardElement.querySelector('.cards-description__title');

  // Adicionando o conteúdo ao card
  cardImage.src = item.link;  
  cardImage.alt = item.name;  
  cardTitle.textContent = item.name;  

  cardImage.addEventListener('click', () => openImagePopUp(item.link, item.name));

  return cardElement;
}


const sectionContainer = '.cards'; 
const section = new Section({ items: initialCards, renderer: createCard }, sectionContainer);
section.renderItems();


export function addCard(data) {
  console.log('Adding card with data:', data);
  const card = new Card(data, '#card-template');
  const cardElement = card.createCard();
  console.log('Card element:', cardElement);
  if (cardElement) {
    cardsContainer.prepend(cardElement);
  } else {
    console.error('Failed to create card element');
  }
}


const settings = {
  nameSelector: '#name',
  aboutSelector: '#about',
  saveButtonSelector: '.popup__save-button',
  localNameSelector: '#local-name',
  localImageSelector: '#local-image',
  addSaveButtonSelector: '#popup__button-save',
  nameErrorSelector: '#popup__error-name',
  aboutErrorSelector: '#popup__error-about',
  placeErrorSelector: '#popup__error-place',
  linkErrorSelector: '#popup__error-link'
};

const editForm = document.querySelector('#edit-form');
if (editForm) {
  new FormValidator(editForm, settings);
}

const addForm = document.querySelector('#add-form');
if (addForm) {
  new FormValidator(addForm, settings);
}


function renderInitialCards() {
  initialCards.forEach(cardData => addCard(cardData));
}

editButton.addEventListener("click", () => openPopUp("edit-modal"));
closeButton.addEventListener("click", () => closePopUp("edit-modal"));
editFormElement.addEventListener("submit", handleProfileFormSubmit);
localButton.addEventListener("click", () => openPopUp("add-modal"));
closeAddButton.addEventListener("click", () => closePopUp("add-modal"));
addFormElement.addEventListener("submit", handleAddFormSubmit);
closeImagePopupButton.addEventListener("click", () => closePopUp("image-modal"));


document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup")) {
    const openPopups = document.querySelectorAll(".popup__opened");
    openPopups.forEach(popup => closePopUp(popup.id));
  }
});

document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup-photo")) {
    closePopUp("image-modal");
  }
});

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    const openPopups = document.querySelectorAll(".popup__opened");
    openPopups.forEach(popup => closePopUp(popup.id));
  }
});


document.addEventListener("DOMContentLoaded", renderInitialCards);
