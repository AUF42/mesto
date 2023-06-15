import { FormValidator, enableValidation } from './FormValidator.js';
import { initialCards } from './initialCards.js';
import { Card } from './Card.js';

// Общие элементы
const popups = document.querySelectorAll('.popup');
const popupCloseBtns = document.querySelectorAll('.popup__close-button');
const inputName = document.querySelector('#input-name');
const inputJob = document.querySelector('#input-profile-caption');

// Форма редактирования профиля
const profileForm = document.querySelector('.profile');
const popupEditProfileOpenBtn = profileForm.querySelector('.profile__edit');
const popupEditingForm = document.querySelector('#popup__profile-edit');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');

// Форма добавления карточки
const popupAddCardOpenBtn = document.querySelector('.profile__add-button');
const popupCreatingCards = document.querySelector('#popup__add-card');
const imageInputCard = document.querySelector('#place-image-input');
const nameInputCard = document.querySelector('#place-name-input');

const cardsContainer = document.querySelector('.elements');

// Форма zoom
export const popupImageZoom = document.querySelector('#image-popup');
export const popupZoomName = popupImageZoom.querySelector('.popup__title');
export const popupZoomImage = popupImageZoom.querySelector('.popup__image');

export const openPopup = function (popupName) {
    popupName.classList.add('popup_opened');
    document.addEventListener(`keydown`, closePopupEsc);
}

const closePopup = function (popupName) {
    popupName.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
}

const closePopupEsc = function (evt) {
    if (evt.key === "Escape") {
        const popupOpened = document.querySelector('.popup_opened')
        closePopup(popupOpened);
    }
}

const openPopupProfileEditing = function (evt) {
    evt.preventDefault();
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

const renderCard = function (object, template) {
    const card = new Card(object, template);
    return card.createCard();
}

const handleCreateNewCard = function (evt) {
    evt.preventDefault();
    evt.submitter.disabled = true;
    cardsContainer.prepend(renderCard({
        name: nameInputCard.value,
        link: imageInputCard.value
        }, '#element-template'));
    evt.target.reset();
    addCardValidate.disableSubmitButton();

    closePopup(popupCreatingCards);
}

const renderInitialCards = function () {
    initialCards.forEach(function (item) {
        cardsContainer.append(renderCard(item, '#element-template'));
    });
}

renderInitialCards();

const addCardValidate = new FormValidator(enableValidation, popupCreatingCards);
addCardValidate.enableValidation();

const editProfileValidate = new FormValidator(enableValidation, popupEditingForm);
editProfileValidate.enableValidation();

popupAddCardOpenBtn.addEventListener('click',  () => openPopup(popupCreatingCards));
popupEditProfileOpenBtn.addEventListener('click', openPopupProfileEditing);

popupCloseBtns.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

popupEditingForm.addEventListener('submit', handleEditProfile);
popupCreatingCards.addEventListener('submit', handleCreateNewCard);

popups.forEach((popupElement) => {
    popupElement.addEventListener('mousedown', (evt) => {
        if (evt.target !== evt.currentTarget) {
            return;
        }
        closePopup(evt.target);
    });
});