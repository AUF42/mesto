import { Popup } from './Popup.js';

class PopupWithImage extends Popup {

    constructor(popupSelector) {
        super(popupSelector);
        this._popupTitle = document.querySelector('.popup__title');
        this._popupImage = document.querySelector('.popup__image');
    }

    open(image) {
        super.open();
        this._popupTitle.textContent = image.name;
        this._popupImage.src = image.link;
        this._popupImage.alt = image.link;
    }
}

export { PopupWithImage };