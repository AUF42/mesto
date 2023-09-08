import { Popup } from './Popup';

class PopupLoading extends Popup {
    constructor(selector, { callbackNotice }) {
        super(selector);
        this._confirmButton = this._popupSelector.querySelector('.popup__save-button');
        this._callbackNotice = callbackNotice;
    }

    open(cardElement, cardId) {
        this._cardElement = cardElement;
        this._cardId = cardId;
        super.open();
    }

    setEventListeners() {
        this._submitButton.addEventListener('submit', (evt) => { evt.preventDefault();
            this._callbackNotice(this._cardElement, this._cardId) })
        super.setEventListeners();
    }
}

export { PopupLoading }