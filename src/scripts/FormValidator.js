class FormValidator {
    constructor(form, settings) {
      
        this.form = form;
        this.nameInput = form.querySelector(settings.nameSelector);
        this.aboutInput = form.querySelector(settings.aboutSelector);
        this.saveButton = form.querySelector(settings.saveButtonSelector);

        this.localNameInput = form.querySelector(settings.localNameSelector);
        this.localImageInput = form.querySelector(settings.localImageSelector);
        this.addSaveButton = form.querySelector(settings.addSaveButtonSelector);

       
        this.errorElements = {
            nameError: form.querySelector(settings.nameErrorSelector),
            aboutError: form.querySelector(settings.aboutErrorSelector),
            placeError: form.querySelector(settings.placeErrorSelector),
            linkError: form.querySelector(settings.linkErrorSelector),
        };

        
        if (this.nameInput || this.aboutInput || this.localNameInput || this.localImageInput) {
           
            this.setEventListeners();
        } else {
            console.error('Os campos do formulário não foram encontrados. Verifique os seletores.');
        }
    }

  
    validateTextField(input, errorElement, fieldName, minLength = 2, maxLength = 40) {
        const value = input.value.trim();

        if (value === '') {
            errorElement.textContent = `Este campo é obrigatório.`;
            return false;
        }

        if (value.length < minLength || value.length > maxLength) {
            errorElement.textContent = `O campo "${fieldName}" deve ter entre ${minLength} e ${maxLength} caracteres.`;
            return false;
        }

        errorElement.textContent = '';
        return true;
    }

   
    validateUrlField(input, errorElement) {
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

   
    validateForm() {
        const isNameValid = this.validateTextField(this.nameInput, this.errorElements.nameError, "Nome", 2, 40);
        const isAboutValid = this.validateTextField(this.aboutInput, this.errorElements.aboutError, "Sobre", 2, 200);
        if (this.saveButton) {
            this.saveButton.disabled = !(isNameValid && isAboutValid);
        }
    }

  
    validateAddForm() {
        const isTitleValid = this.validateTextField(this.localNameInput, this.errorElements.placeError, "Título", 2, 30);
        const isUrlValid = this.validateUrlField(this.localImageInput, this.errorElements.linkError);
        if (this.addSaveButton) {
            this.addSaveButton.disabled = !(isTitleValid && isUrlValid);
        }
    }

    
    setEventListeners() {
        if (this.nameInput && this.aboutInput) {
            this.nameInput.addEventListener('input', () => this.validateForm());
            this.aboutInput.addEventListener('input', () => this.validateForm());
        }

        if (this.localNameInput && this.localImageInput) {
            this.localNameInput.addEventListener('input', () => this.validateAddForm());
            this.localImageInput.addEventListener('input', () => this.validateAddForm());
        }
    }
}


export { FormValidator };
