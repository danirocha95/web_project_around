class UserInfo {
    constructor({ nameSelector, infoSelector }) {
        // Selecionando os elementos do DOM
        this._nameElement = document.querySelector(nameSelector);
        this._infoElement = document.querySelector(infoSelector);

        // Lançando erro se algum dos elementos não for encontrado
        if (!this._nameElement) {
            throw new Error(`Elemento com o seletor "${nameSelector}" não foi encontrado.`);
        }
        if (!this._infoElement) {
            throw new Error(`Elemento com o seletor "${infoSelector}" não foi encontrado.`);
        }
    }

    // Método privado para validar e atualizar o conteúdo de texto de um elemento
    _validateAndSetContent(element, value, fieldName) {
        if (value && typeof value === 'string' && value.trim() !== '') {
            element.textContent = value;
        } else {
            console.warn(`Valor inválido fornecido para "${fieldName}":`, value);
        }
    }

    // Atualiza as informações do usuário no DOM
    setUserInfo({ name, info }) {
        this._validateAndSetContent(this._nameElement, name, 'name');
        this._validateAndSetContent(this._infoElement, info, 'info');
    }

    // Retorna as informações atuais do usuário
    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            info: this._infoElement.textContent,
        };
    }
}

export default UserInfo;
