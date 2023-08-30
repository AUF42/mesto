class FormValidator {
    constructor(object, elementValidation) {
        this._object = object;
        this._elementValidation = elementValidation;
        this._submitElement = this._elementValidation.querySelector(this._object.submitButtonSelector);
        this._inputList = Array.from(this._elementValidation.querySelectorAll(this._object.inputSelector));
    }

    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._elementValidation.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._object.inputErrorClass);
        errorElement.classList.add(this._object.errorClass);
        errorElement.textContent = errorMessage;
    }

    _hideInputError = (inputElement) => {
        const errorElement = this._elementValidation.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._object.inputErrorClass);
        errorElement.classList.remove(this._object.errorClass);
        errorElement.textContent = '';
    }

    _hasInvalidInput = () => {
        return this._inputList.some((inputItem) => {
            return !inputItem.validity.valid;
        });
    }

    _toggleButtonState = () =>  {

        if (this._hasInvalidInput()) {
           this.disableSubmitButton();

        } else {
            this._enableSubmitButton();
        }
    }

    disableSubmitButton() {
        this._submitElement.classList.add(this._object.inactiveButtonClass);
        this._submitElement.setAttribute('disabled', true);
    }

    _enableSubmitButton() {
        this._submitElement.classList.remove(this._object.inactiveButtonClass);
        this._submitElement.removeAttribute('disabled');
    }

     _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

     _setEventListeners = () => {
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
       this._setEventListeners();
    }
}



export { FormValidator };