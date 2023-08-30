class Card {

    constructor(name, link, templateElement, handleCardClick) {
        this._name = name;
        this._image = link;
        this._template = templateElement;
        this._handleCardClick = handleCardClick;
        this._elementCard = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);
        this._elementImages = this._elementCard.querySelector('.element__picture');
        this._elementName = this._elementCard.querySelector('.element__intro');
        this._likeIcon = this._elementCard.querySelector('.element__like');
        this._deleteIcon = this._elementCard.querySelector('.element__delete');
    }

    _deleteCard = () => {
        return this._elementCard.remove();
    }

    _toggleLike = (evt) => {
        evt.target.classList.toggle('element__like_active');
    }

    _addEventHandler = () => {
        this._likeIcon.addEventListener('click', event => this._toggleLike(event));
        this._deleteIcon.addEventListener('click', event => this._deleteCard(event));
        this._elementImages.addEventListener('click', () => this._handleCardClick(this._name, this._image));
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