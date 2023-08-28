import { Popup } from './Popup.js';

class PopupWithImage extends Popup {

    constructor(popupSelector) {
        super(popupSelector);
        this._popupTitle = document.querySelector('.popup__title');
        this._popupImage = document.querySelector('.popup__image');
    }

    open(title, image) {
        this._popupTitle.textContent = title;
        this._popupImage.src = image;
        this._popupImage.alt = title;
        super.open();
    }
}

export { PopupWithImage };