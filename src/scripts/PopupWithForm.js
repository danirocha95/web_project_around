import Popup from './Popup.js';
import { handleProfileFormSubmit } from './utils.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    const values = {};
    this._inputs.forEach(input => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();

  
    this._form.addEventListener('submit', handleProfileFormSubmit);
  }

  close() {
    super.close();
    this._form.reset();
  }
}


