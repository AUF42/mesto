import { Popup } from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popupSelector, handleCardClick) {
        super(popupSelector);
        this._handleCardClick = handleCardClick;
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
            this._handleCardClick(this._getInputValues());
        });
    }

    close() {
        this._popupForm.reset();
        super.close();
    }
}

export { PopupWithForm };