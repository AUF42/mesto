import { Popup } from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popupSelector, handleCardClick) {
        super(popupSelector);
        this._handleCardClick = handleCardClick;
        this._popupForm = this._popupName.querySelector('.popup__form');
        this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
        this._submitButton = this._popupForm.querySelector('.popup__save-button');
    }

    _getInputValues() {
        this._formInputValues = {};
        this._inputList.forEach(inputItem => {
            this._formInputValues[inputItem.name] = inputItem.value;
        });
        return this._formInputValues;
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
            if (data[input.name]) {
                input.value = data[input.name];
            }
        });
    }

    renderLoading(isLoading) {
        if(isLoading) {
            this._submitButton.textContent = 'Сохранение...';
        } else {
            this._submitButton.textContent = 'Сохранить';
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleCardClick(this._getInputValues());
            this.close();
        });
    }

    close() {
        this._popupForm.reset();
        super.close();
    }
}

export { PopupWithForm };