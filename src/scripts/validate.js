function validateTextField(input, errorElement, fieldName, minLength = 2, maxLength = 40) {
    const value = input.value.trim();

    if (value === '') {
        errorElement.textContent = `Este campo é obrigatório.`;
        return false;
    }
    
    if (value.length < minLength || value.length > maxLength) {
        errorElement.textContent = `O campo "${fieldName}" deve conter entre ${minLength} e ${maxLength} caracteres.`;
        return false;
    }

    errorElement.textContent = '';
    return true;
}

function validateUrlField(input, errorElement) {
    const value = input.value.trim();

    if (value === '') {
        errorElement.textContent = 'Este campo é obrigatório.';
        return false;
    }

    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(value)) {
        errorElement.textContent = 'O campo "URL da imagem" deve conter uma URL válida.';
        return false;
    }

    errorElement.textContent = '';
    return true;
}

function validateForm() {
    const isNameValid = validateTextField(nameInput, document.querySelector("#popup__error-name"), "Nome", 2, 40);
    const isAboutValid = validateTextField(aboutInput, document.querySelector("#popup__error-about"), "Sobre", 2, 200);
    saveButton.disabled = !(isNameValid && isAboutValid);
}

function validateAddForm() {
    const isTitleValid = validateTextField(localNameInput, document.querySelector("#popup__error-place"), "Título", 2, 30);
    const isUrlValid = validateUrlField(localImageInput, document.querySelector("#popup__error-link"));
    addSaveButton.disabled = !(isTitleValid && isUrlValid);
}

nameInput.addEventListener('input', validateForm);
aboutInput.addEventListener('input', validateForm);

localNameInput.addEventListener('input', validateAddForm);
localImageInput.addEventListener('input', validateAddForm);

