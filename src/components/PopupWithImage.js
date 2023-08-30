import { Popup } from './Popup.js';

class PopupWithImage extends Popup {

    constructor(popupSelector) {
        super(popupSelector);
        this._popupName = document.querySelector(this._popupSelector);
        this._popupTitle = this._popupName.querySelector('.popup__title');
        this._popupImage = this._popupName.querySelector('.popup__image');
    }

    open(name, link) {
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupTitle.textContent = name;
        super.open();
    }
}

export { PopupWithImage };