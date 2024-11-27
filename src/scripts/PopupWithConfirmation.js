import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleConfirm) {
        super(popupSelector);
        this._handleConfirm = handleConfirm; // Função a ser chamada ao confirmar
        this._confirmButton = this._popup.querySelector('.popup__confirm-button'); // Selecione o botão de confirmação

        // Usando uma arrow function para garantir o escopo correto de 'this'
        this._confirmButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            const cardId = this._popup.dataset.cardId; // Supondo que você armazena o ID do cartão no popup
            this._handleConfirm(cardId); // Chama a função de confirmação
            this.close(); // Fecha o popup após confirmação
        });
    }

    open(cardId) {
        super.open();
        this._popup.dataset.cardId = cardId; // Armazena o ID do cartão ao abrir o popup
    }
}
