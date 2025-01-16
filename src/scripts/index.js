import { openPopUp, closePopUp, openImagePopUp, handleProfileFormSubmit, handleAddFormSubmit } from './utils.js';
import { FormValidator } from './FormValidator.js';
import Card from './Card.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import "../pages/index.css";
import { Api } from './Api.js';
import PopupWithConfirmation from './PopupWithConfirmation.js';

const cardContainer = document.querySelector('.cards');

// Inicialização da API
const api = new Api({
    baseUrl: 'https://around.nomoreparties.co/v1/web-ptbr-cohort-14',
    headers: {
        authorization: '24d8aa49-6bef-4a1c-8834-8b629389c058',
        'Content-Type': 'application/json'
    }
});

api.getInitialCards()
    .then(cards => {
       
        if (!userId) {
            console.error('userId não está definido ao criar os cartões.');
            return; // Interrompe se userId estiver null ou undefined
        }

        cards.forEach(cardData => {

            const card = new Card({
                name: cardData.name,
                link: cardData.link,
                _id: cardData._id,
                likes: cardData.likes,
                owner: cardData.owner,
                _userId: userId 
            }, "#card-template", api, confirmationPopup);
            const cardElement = card.createCard(); // Criar o cartão usando o método da classe Card
            cardContainer.append(cardElement); // Adiciona o cartão diretamente ao contêiner
        });
    })
    .catch(err => {
        console.log('Erro ao buscar cartões:', err);
    });

    let userId;

    async function loadProfile() {
        try {
            const userData = await api.getUserInfo(); // Obtém os dados do usuário da API
            console.log('Dados do usuário:', userData);
            
            if (userData && userData._id) {
                userId = userData._id; // Atribui o userId
            } else {
                throw new Error('userData._id não encontrado');
            }
    
            userInfo.setUserInfo({
                name: userData.name,
                info: userData.about
            });
        } catch (error) {
            console.error('Erro ao carregar os dados do usuário:', error);
        }
    }

loadProfile();

// Função de confirmação de exclusão de cartão
const confirmationPopup = new PopupWithConfirmation('#confirmation-modal', (cardId, cardElement) => {
    api.deleteCard(cardId)
        .then(() => {
            
            cardElement.remove(); // Remove o cartão da interface
            confirmationPopup.close(); // Fecha o modal de confirmação
        })
        .catch(err => console.error(err));
});

// Não esqueça de ativar os listeners para o modal de confirmação
confirmationPopup.setEventListeners();


// Função que será passada para o Card, para ser usada no evento de exclusão
const handleCardDelete = (cardId) => {
    confirmationPopup.open(cardId); // Abre o popup de confirmação com o ID do cartão
};

const localButton = document.querySelector("#local-button");
const closeButton = document.querySelector("#close-button");
const closeAddButton = document.querySelector("#close-add-button");
const editFormElement = document.querySelector("#edit-form");
const addFormElement = document.querySelector("#add-form");
const closeImagePopupButton = document.querySelector(".popup-photo__close-button");

const imagePopup = new PopupWithImage('#image-modal');
const userInfo = new UserInfo({
    nameSelector: '.profile-info__name',
    infoSelector: '.profile-info__explore'
});

// Popup para editar perfil
const editPopup = new PopupWithForm('#edit-modal', handleProfileFormSubmit);
const addPopup = new PopupWithForm('#add-modal', handleAddFormSubmit);

editPopup.setEventListeners();
addPopup.setEventListeners();

const editButton = document.querySelector('#edit-button');
const addButton = document.querySelector('#local-button');

editButton.addEventListener('click', () => {
    editPopup.open();
});

addButton.addEventListener('click', () => {
    addPopup.open();
});

// Configuração da seção onde os cartões serão renderizados
const sectionContainer = '.cards';
const section = new Section({ items: [], renderer: (data) => addCard(data) }, sectionContainer);
section.renderItems();

export function addCard(data) {
    const card = new Card({ name: data.name, link: data.link, _id: data._id, likes: data.likes }, "#card-template", api, handleCardDelete,);
    const cardElement = card.createCard(); // Usar o método de criação de cartão da classe Card
    if (cardElement) {
        section.addItem(cardElement); // Adiciona o cartão ao contêiner
        console.log("Cartão adicionado com sucesso!");
    } else {
        console.error('Falha ao criar elemento do cartão');
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

// Adicionar ouvintes de eventos para abrir e fechar popups
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
