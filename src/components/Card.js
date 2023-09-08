class Card {

    constructor(cardElement, templateElement, userId, ownerData, handleCardClick) {
        this._card = cardElement;
        this._id = cardElement._id;
        this._name = cardElement.name;
        this._image = cardElement.link;
        this._template = templateElement;

        this._userId = userId;
        this._cardId = ownerData.cardId;
        this._ownerId = ownerData.ownerId;

        this._elementCard = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);
        this._elementImages = this._elementCard.querySelector('.element__picture');
        this._elementName = this._elementCard.querySelector('.element__intro');
        this._likeIcon = this._elementCard.querySelector('.element__like');
        this._deleteIcon = this._elementCard.querySelector('.element__delete');
        this.likeSelector = this._elementCard.querySelector('.element__like-counter');

        this._cardZoom = handleCardClick.handleCardZoom;
        this._cardDelete = handleCardClick.handleCardDelete;
        this._putLike = handleCardClick.handleCardLike;
        this._removeLike = handleCardClick.handleCardDeleteLike;
    }

    deleteCard = () => {
        return this._elementCard.remove();
    }

    _likedCard() {
        return this._likeArea.find((userLike) => userLike._id === this._userId);
    };

    _toggleLike = (evt) => {
        if (this._likedCard()) {
            this._removeLike(this._cardId);
        } else {
            this._putLike(this._cardId);
        }
    }

    renderCardLike(card) {
        this._likeArea = card.likes;
        if (this._likeArea.length === 0) {
            this.likeSelector.textContent = '';
        } else {
            this.likeSelector.textContent = this._likeArea.length;
        }
        if (this._likedCard()) {
            this._likeIcon.classList.add('element__like_active');
        } else {
            this._likeIcon.classList.remove('element__like_active');
        }
    }

    createCard() {
        this._elementName.textContent = this._name;
        this._elementImages.src = this._image;
        this._elementImages.alt = this._name;
        this.renderCardLike(this._card);
        this._addEventHandler();
        return this._elementCard;
    }

    _addEventHandler = () => {
        this._likeIcon.addEventListener('click', event => this._toggleLike());
        this._elementImages.addEventListener('click', () => this._cardZoom(this._name, this._image));
        if (this._userId === this._dataId) {
            this._deleteIcon.addEventListener('click', () =>  this._cardDelete(this, this._cardId));
        } else {
            this._deleteIcon.remove();
        }
    }
}

export { Card };