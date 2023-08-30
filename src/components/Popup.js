class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popupName = document.querySelector(this._popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popupName.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popupName.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        this._popupName.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')
                || evt.target.classList.contains('popup__close-button')) {
                this.close();
            }
        });
    }
}

export { Popup };