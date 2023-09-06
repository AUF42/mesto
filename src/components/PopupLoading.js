import { Popup } from './Popup';

class PopupLoading extends Popup {
    constructor(selector) {
        super(selector);
        this._confirmButton = this._popupSelector.querySelector('.popup__save-button');
    }

    renderDeleting(isLoading) {
        if(isLoading) {
            this._confirmButton.textContent = 'Удаление...';
        } else {
            this._confirmButton.textContent = 'Да';
        }
    }

    setConfirm(callback) {
        this._handleConfirmationCallback = callback;
    }

    setEventListeners() {
        super.setEventListeners();
        this._confirmButton.addEventListener('click', () => {
            this._handleConfirmationCallback();
        });
    }
}

export { PopupLoading }