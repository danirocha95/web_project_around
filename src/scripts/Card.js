import { openImagePopUp } from './utils.js'

export default class Card {
    constructor(data, templateSelector) {
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
    }
  
    createCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
      this._setCardData();
      return this._element;
    }
  
    _getTemplate() {
      const template = document.querySelector(this._templateSelector).content;
      return template.querySelector('.cards__element').cloneNode(true);
    }
  
    _setCardData() {
      this._element.querySelector('.cards__image').src = this._link;
      this._element.querySelector('.cards__image').alt = this._name;
      this._element.querySelector('.cards-description__title').textContent = this._name;
    }
  
    _setEventListeners() {
      this._element.querySelector('.cards__image').addEventListener('click', () => this._handleImageClick());
      this._element.querySelector('.cards-trash__button').addEventListener('click', () => this._handleTrashClick());
      this._element.querySelector('.cards-description__icon-like').addEventListener('click', () => this._handleLikeClick());
    }
  
    _handleImageClick() {
      openImagePopUp(this._link, this._name); 
    }
  
    _handleTrashClick() {
      this._element.remove();
    }
  
    _handleLikeClick() {
      const likeIcons = this._element.querySelectorAll('.cards-description__icon-like img');
      
      likeIcons.forEach(likeIcon => {
        if (likeIcon.classList.contains('card__hide-like-image')) {
          likeIcon.classList.remove('card__hide-like-image')
        } else {
          likeIcon.classList.add('card__hide-like-image')
        }
      });

    }
   }
  