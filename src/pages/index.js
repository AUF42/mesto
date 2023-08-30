import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards } from '../utils/initialCards.js';
import { Card } from '../components/Card.js';
import './index.css';
import {
    cardsContainer, enableValidation,
    popupAddCardOpenBtn,
    popupCreatingCards,
    popupEditingForm,
    popupEditProfileOpenBtn
} from '../utils/constants';

const addCardValidate = new FormValidator(enableValidation, popupCreatingCards);
const editProfileValidate = new FormValidator(enableValidation, popupEditingForm);

editProfileValidate.enableValidation();
addCardValidate.enableValidation();

// Форма zoom
const popupImageZoom = new PopupWithImage('#image-popup');
popupImageZoom.setEventListeners();

const createCard = (data) => {
    const card = new Card(data.name, data.link, '#element-template', () => {
        popupImageZoom.open(data.name, data.link);
    });
    return card.createCard();
}

// Создание новой карточки
const popupCreateNewCard = new PopupWithForm('#popup__add-card', (item) => {
        renderInitialCard.addItem(createCard(item));
        popupCreateNewCard.close();
});
popupCreateNewCard.setEventListeners();

popupAddCardOpenBtn.addEventListener('click', function () {
    popupCreateNewCard.open();
    addCardValidate.disableSubmitButton();
});

// Форма профиля
const userInfo = new UserInfo({
    profileNameSelector: '.profile__name',
    profileCaptionSelector: '.profile__caption'
});

//Редактирование профиля
const popupProfileEdit = new PopupWithForm('#popup__profile-edit', ({ name, profession }) => {
    userInfo.setUserInfo({ name, profession });
    popupProfileEdit.close();
});

popupProfileEdit.setEventListeners();

popupEditProfileOpenBtn.addEventListener('click', () => {
    popupProfileEdit.setInputValues(userInfo.getUserInfo());
    popupProfileEdit.open();
});

// Создание секции и отображение карточек
const renderInitialCard = new Section({
    renderer: (CardInfo) => {
        renderInitialCard.addItem(createCard(CardInfo));
    },
}, cardsContainer);

renderInitialCard.renderItems(initialCards);
