// Общие элементы
const popupCloseBtns = document.querySelectorAll('.popup__close-button');
const inputName = document.querySelector('#input-name');
const inputJob = document.querySelector('#input-profile-caption');

// Форма редактирования профиля
const popupEditProfileOpenBtn = document.querySelector('.profile__edit');
const popupEditingForm = document.querySelector('#popup__profile-edit');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');

// Форма добавления карточки
const popupAddCardOpenBtn = document.querySelector('.profile__add-button');
const popupCreatingCards = document.querySelector('#popup__add-card');
const imageInputCard = document.querySelector('#place-image-input');
const nameInputCard = document.querySelector('#place-name-input');

const cards = document.querySelector('.elements');
const cardTemplate = document.querySelector('#element-template').content;

// Форма zoom
const popupImageZoom = document.querySelector('#image-popup');

function createCard(name, link) {
    const card =  cardTemplate
        .querySelector('.element').cloneNode(true);
    card.querySelector('.element__intro').textContent = name;
    card.querySelector('.element__picture').src = link;
    card.querySelector('.element__picture').alt = name;

    card.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });

    card.querySelector('.element__delete').addEventListener('click', function (evt) {
        evt.target.closest('.element').remove();
    });

    const showZoomImage = function () {
        popupImageZoom.querySelector('.popup__title').textContent = name;
        popupImageZoom.querySelector('.popup__image').src = link;
        popupImageZoom.querySelector('.popup__image').alt = name;
        openPopup(popupImageZoom);
    }

    card.querySelector('.element__picture').addEventListener('click', showZoomImage);

    return card;
}

function addCard(container, element) {
    container.prepend(element);
}

initialCards.forEach(function (item) {
    addCard(cards, createCard(item.name, item.link));
});

const openPopup = function (popupName) {
    popupName.classList.add('popup_opened');
}

const closePopup = function (popupName) {
    popupName.classList.remove('popup_opened');
}

const popupOpenProfileEditing = function () {
    openPopup(popupEditingForm);
    inputName.value = profileName.textContent;
    inputJob.value = profileCaption.textContent;
}

const handleEditProfile = function (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileCaption.textContent = inputJob.value;
    closePopup(popupEditingForm);
}

const handleCreateNewCard = function (evt) {
    evt.preventDefault();
    addCard(cards,
        createCard(
            nameInputCard.value,
            imageInputCard.value));
    popupClose(popupCreatingCards);
    evt.target.reset();
}

popupEditProfileOpenBtn.addEventListener('click', popupOpenProfileEditing);

popupCloseBtns.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

popupEditingForm.addEventListener('submit', handleEditProfile);
popupCreatingCards.addEventListener('submit', handleCreateNewCard);

popupAddCardOpenBtn.addEventListener('click',  () => openPopup(popupCreatingCards));
