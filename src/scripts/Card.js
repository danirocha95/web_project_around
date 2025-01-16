import { openImagePopUp } from './utils.js';

export default class Card {
    constructor(data, templateSelector, api, confirmationPopup) {
        console.log('Dados recebidos no Card:', data);
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes || [];
        this._id = data._id;
        this._ownerId = data.owner?._id;
        this._userId = data._userId 
        this._templateSelector = templateSelector;
        this._api = api;
        this._confirmationPopup = confirmationPopup;
    
        
        // Usando bind para garantir que 'this' se refira à instância correta de Card
        this._handleTrashClick = this._handleTrashClick.bind(this);
    }

    createCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._populateCardData();
        return this._element;
    }
    

    _getTemplate() {
        const template = document.querySelector(this._templateSelector).content;
        return template.querySelector('.cards__element').cloneNode(true);
    }

    _populateCardData() {
        const image = this._element.querySelector('.cards__image');
        image.src = this._link;
        image.alt = this._name;

        this._element.querySelector('.cards-description__title').textContent = this._name;

        const likeCounter = this._element.querySelector('.like-count');
        likeCounter.textContent = this._likes.length;

        const trashButton = this._element.querySelector('.cards-trash__button');
        if (this._ownerId !== this._userId) {
            trashButton.style.display = 'none';
        }
        const likeButton = this._element.querySelector('.cards-description__icon-like');
        if (this._isLiked()) {
            likeButton.classList.add('liked'); // Adiciona a classe se o usuário curtiu
        } else {
            likeButton.classList.remove('liked'); // Remove a classe se o usuário não curtiu
        }
    }
    

    _setEventListeners() {
        this._element.querySelector('.cards__image').addEventListener('click', () => this._handleImageClick());
        
        const trashButton = this._element.querySelector('.cards-trash__button');
        if (trashButton) {
            trashButton.addEventListener('click', this._handleTrashClick);  // Ajustado para usar o bind
        }

        this._element.querySelector('.cards-description__icon-like').addEventListener('click', () => this._handleLikeClick());
    }

    _handleImageClick() {
        openImagePopUp(this._link, this._name);
    }

    _handleTrashClick() {
        this._confirmationPopup.open(this._id, this._element); // Passa o ID e o elemento do cartão
    }

    _handleLikeClick() {
        const likeButton = this._element.querySelector('.cards-description__icon-like');
        const likeIcon = likeButton.querySelector('img');  // Referência ao ícone atual
        const hideLikeIcon = likeButton.querySelector('.like-icon-on');  // Referência ao segundo ícone (on)
    
        const method = this._isLiked() ? 'DELETE' : 'PUT'; // Determina o método com base no estado atual
    
        this._api.toggleLike(this._id, method)
            .then(updatedCard => {
                this._likes = updatedCard.likes; // Atualiza os likes com os dados do servidor
                const likeCounter = this._element.querySelector('.like-count');
                likeCounter.textContent = this._likes.length;
    
                // Atualiza o CSS com base no estado do like
                if (this._isLiked()) {
                    likeButton.classList.add('liked');
                    likeIcon.src = likeButton.querySelector('img[alt="Curtir"]').getAttribute('src');
                    hideLikeIcon.style.display = 'block';  // Exibe o ícone de "Curtir"
                } else {
                    likeButton.classList.remove('liked');
                    likeIcon.src = likeButton.querySelector('img[alt="Curtir"]').getAttribute('src');
                    hideLikeIcon.style.display = 'none';  // Esconde o ícone de "Curtir"
                }
            })
            .catch(err => console.error('Erro ao alterar o like:', err));
    }
    

    _isLiked() {
        console.log("likes", this._likes);
        console.log("userId", this._userId);
        return this._likes.some(like => like._id === this._userId);
    }

    
}


