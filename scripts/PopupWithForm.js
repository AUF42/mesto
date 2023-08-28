import { Popup } from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popupSelector, { callbackFormSubmit }) {
        super(popupSelector);
        this._callbackFormSubmit = callbackFormSubmit;
        this._popupForm = this._popupName.querySelector('.popup__form');
        this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
    }

    _getInputValues() {
        this._formInputValues = {};
        this._inputList.forEach(inputItem => {
            this._formInputValues[inputItem.name] = inputItem.value;
        });
        return this._formInputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callbackFormSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}

export { PopupWithForm };