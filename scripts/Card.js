import { popupImageZoom, openPopup } from './index.js';

class Card {
    constructor(object, templateElement) {
        this._name = object.name;
        this._image = object.link;
        this._template = templateElement;
        this._elementCard = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);
        this._elementImages = this._elementCard.querySelector('.element__picture');
        this._elementName = this._elementCard.querySelector('.element__intro');
        this._likeIcon = this._elementCard.querySelector('.element__like');
        this._deleteIcon = this._elementCard.querySelector('.element__delete');
        this._popupZoomName = popupImageZoom.querySelector('.popup__title');
        this._popupZoomImage = popupImageZoom.querySelector('.popup__image');
    }

    _deleteCard = (evt) => {
        evt.target.closest('.element').remove();
    }

    _addLike = (evt) => {
        evt.target.classList.toggle('element__like_active');
    }

    _showZoomImage = function () {
        this._popupZoomName.textContent = this._name;
        this._popupZoomImage.src = this._image;
        this._popupZoomImage.alt = this._name;
        openPopup(popupImageZoom);
    }

    _addEventHandler = () => {
        this._likeIcon.addEventListener('click', event => this._addLike(event))
        this._deleteIcon.addEventListener('click', event => this._deleteCard(event));
        this._elementImages.addEventListener('click', () => this._showZoomImage())
    }

    createCard() {
        this._elementName.textContent = this._name;
        this._elementImages.src = this._image;
        this._elementImages.alt = this._name;

        this._addEventHandler();
        return this._elementCard;
    }
}

export { Card };