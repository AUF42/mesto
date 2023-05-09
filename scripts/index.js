// Общие элементы
const popupCloseBtn = document.querySelectorAll('.popup__close-button');
let inputName = document.querySelector('#input-name');
let inputJob = document.querySelector('#input-profile-caption');

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

// Массив карточек
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function createCard(name, link) {
    const card =  cardTemplate
        .querySelector('.element').cloneNode(true);
    card.querySelector('.element__intro').textContent = name;
    card.querySelector('.element__picture').src = link;

    card.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });

    card.querySelector('.element__delete').addEventListener('click', function (evt) {
        evt.target.closest('.element').remove();
    });

    const getZoomImage = function () {
        popupImageZoom.querySelector('.popup__title').textContent = name;
        popupImageZoom.querySelector('.popup__image').src = link;
        openPopup(popupImageZoom);
    }

    card.querySelector('.element__picture').addEventListener('click', getZoomImage);

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

const popupClose = function (popupName) {
    popupName.classList.remove('popup_opened');
}

const popupOpenProfileEditing = function () {
    openPopup(popupEditingForm);
    inputName.value = profileName.textContent;
    inputJob.value = profileCaption.textContent;
}

const formSubmitHandler = function (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileCaption.textContent = inputJob.value;
    popupClose(popupEditingForm);
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

popupCloseBtn.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => popupClose(popup));
});

popupEditingForm.addEventListener('submit', formSubmitHandler);
popupCreatingCards.addEventListener('submit', handleCreateNewCard);

popupAddCardOpenBtn.addEventListener('click',  () => openPopup(popupCreatingCards));
