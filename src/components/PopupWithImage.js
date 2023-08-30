import { Popup } from './Popup.js';

class PopupWithImage extends Popup {

    constructor(popupSelector) {
        super(popupSelector);
        this._popupTitle = document.querySelector('.popup__title');
        this._popupImage = document.querySelector('.popup__image');
    }

    open(name, link) {
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupTitle.textContent = name;
        super.open();
    }
}

export { PopupWithImage };