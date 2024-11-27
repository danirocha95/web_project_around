import { Api } from './Api.js';
import { addCard } from './index.js';
import UserInfo from './UserInfo.js';

const userInfo = new UserInfo({
    nameSelector: '.profile-info__name',
    infoSelector: '.profile-info__explore'
});

// Crie uma instância da API
const api = new Api({
    baseUrl: 'https://around.nomoreparties.co/v1/web-ptbr-cohort-14',
    headers: {
        authorization: '24d8aa49-6bef-4a1c-8834-8b629389c058',
        "Content-Type": 'application/json'
    }
});

// Função para abrir o popup
export function openPopUp(modalId) {
    const popup = document.querySelector(`#${modalId}`);
    if (popup) {
        popup.classList.add("popup__opened");
    }
}

// Função para fechar o popup
export function closePopUp(modalId) {
    const popup = document.querySelector(`#${modalId}`);
    if (popup) {
        popup.classList.remove("popup__opened");
    }
}

// Função para abrir o popup de imagem
export function openImagePopUp(link, name) {
    const imageModal = document.querySelector("#image-modal");
    const imageModalImage = imageModal.querySelector(".popup-photo__image");
    const popupImageCaption = imageModal.querySelector(".popup-photo__title");

    imageModalImage.src = link;
    imageModalImage.alt = name;
    popupImageCaption.textContent = name;
    openPopUp("image-modal");
}

// Função para lidar com o envio do formulário de adicionar
export function handleAddFormSubmit(evt) {
    evt.preventDefault();  // Previne o comportamento padrão do formulário

    const localName = document.querySelector("#local-name").value;
    const localImage = document.querySelector("#local-image").value;

    console.log("Valor de localName:", localName);
    console.log("Valor de localImage:", localImage);

    // Verifica se os campos estão preenchidos corretamente
    if (!localName || !localImage) {
        alert("Por favor, preencha todos os campos.");
        return; // Impede o envio se os campos estiverem vazios
    }

    // Validação do link da imagem (verificando se é um URL válido)
    const isValidImageUrl = localImage.match(/\.(jpeg|jpg|gif|png)$/);
    if (!isValidImageUrl) {
        alert("Por favor, insira um link de imagem válido.");
        return;
    }

    // Faz a requisição para a API
    api.addCard({ name: localName, link: localImage })
        .then((newCard) => {
            console.log("Novo cartão criado:", newCard);

            // Adiciona o novo cartão ao início da lista
            addCard(newCard);

            // Fecha o popup de criação de cartão
            console.log("Fechando o popup...");
            closePopUp("add-modal");

            // Reseta o formulário
            evt.target.reset();
        })
        .catch((err) => {
            console.error("Erro ao adicionar o cartão:", err);
            alert("Erro ao adicionar o cartão. Tente novamente.");
        });
}

// Função para lidar com o envio do formulário de edição de perfil
export function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const nameInput = document.querySelector("#name").value;
    const aboutInput = document.querySelector("#about").value;

    if (nameInput && aboutInput) {
        api.updateProfile(nameInput, aboutInput)
            .then(() => {
                userInfo.setUserInfo({
                    name: nameInput,
                    info: aboutInput
                });
                closePopUp("edit-modal");
            })
            .catch((err) => {
                console.error(err);
                alert("Erro ao atualizar o perfil. Tente novamente.");
            });
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

// Adicionar o ouvinte de evento ao formulário de adição se existir
const addFormElement = document.querySelector("#add-form");
if (addFormElement) {
    addFormElement.addEventListener("submit", handleAddFormSubmit);
}
