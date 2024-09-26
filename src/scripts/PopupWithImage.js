import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector('.popup-photo__image');
    this._captionElement = this._popup.querySelector('.popup-photo__title');
  }

  open(imageSrc, imageCaption) {
    this._imageElement.src = imageSrc;
    this._imageElement.alt = imageCaption;
    this._captionElement.textContent = imageCaption;
    super.open();
  }
}
