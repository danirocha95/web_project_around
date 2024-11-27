export default class Popup {
  constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._handleEscClose = this._handleEscClose.bind(this);  // Garantindo que o this seja o correto
  }

  open() {
      this._popup.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose);  // Escuta a tecla "Esc" para fechar
  }

  close() {
      this._popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);  // Remove a escuta da tecla "Esc"
  }

  _handleEscClose(event) {
      if (event.key === 'Escape') {
          this.close();  // Fecha o popup se "Escape" for pressionado
      }
  }

  setEventListeners() {
      // Usando uma arrow function para garantir o escopo correto do this
      this._popup.querySelector('.popup__close-button').addEventListener('click', () => this.close());  // Fecha ao clicar no botão

      this._popup.addEventListener('click', (event) => {
          if (event.target === this._popup) {
              this.close();  // Fecha se clicar fora do popup
          }
      });
  }

  
}
