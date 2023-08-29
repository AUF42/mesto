import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator, enableValidation } from '../components/FormValidator.js';
import { initialCards } from '../utils/initialCards.js';
import { Card } from '../components/Card.js';
import './index.css';

const addIcon = new URL('../images/icons/add-icon.svg', import.meta.url);
const addSmallIcon = new URL('../images/icons/add-small-icon.svg', import.meta.url);
const closeIcon = new URL('../images/icons/close-icon.svg', import.meta.url);
const closeSmallIcon = new URL('../images/icons/close-small-icon.svg', import.meta.url);
const editIcon = new URL('../images/icons/edit-icon.svg', import.meta.url);
const editSmallIcon = new URL('../images/icons/edit-small-icon.svg', import.meta.url);
const likeBlack = new URL('../images/icons/like-black.svg', import.meta.url);
const likeWhite = new URL('../images/icons/like-white.svg', import.meta.url);
const trash = new URL('../images/icons/trash.svg', import.meta.url);
const logo = new URL('../images/logo.svg', import.meta.url);
const profileAvatar = new URL('../images/profile-avatar.jpg', import.meta.url);

const Images = [
    { name: 'addIcon', link: addIcon },
    { name: 'addSmallIcon', link: addSmallIcon },
    { name: 'closeIcon', link: closeIcon },
    { name: 'closeSmallIcon', link: closeSmallIcon },
    { name: 'editIcon', link: editIcon },
    { name: 'editSmallIcon', link: editSmallIcon },
    { name: 'likeBlack', link: likeBlack },
    { name: 'likeWhite', link: likeWhite },
    { name: 'trash', link: trash },
    { name: 'logo', link: logo },
    { name: 'profileAvatar', link: profileAvatar },
];

// Общие элементы
const popups = '.popup';
const popupCloseBtns = document.querySelectorAll('.popup__close-button');

const inputName = document.querySelector('#input-name');
const inputJob = document.querySelector('#input-profile-caption');

// Форма редактирования профиля
const popupEditProfileOpenBtn = document.querySelector('.profile__edit');
const popupEditingForm = document.querySelector('#popup__profile-edit');

// Форма добавления карточки
const popupAddCardOpenBtn = document.querySelector('.profile__add-button');
const popupCreatingCards = document.querySelector('#popup__add-card');
const imageInputCard = '#place-image-input';
const nameInputCard = '#place-name-input';

const cardsContainer = '.elements';

// Форма zoom
const popupImageZoom = new PopupWithImage('#image-popup');

// Создание новой карточки
const createCard = (cardData) => {
    const card = new Card(cardData, '#element-template', () => {
        popupImageZoom.open(cardData);
    });
    return card.create();
}

// Создание секции и отображение карточек
const renderInitialCard = new Section({
    renderer: (CardInfo) => {
        renderInitialCard.addItem(createCard(CardInfo));
    },
}, cardsContainer);

renderInitialCard.renderItems(initialCards);

// Форма профиля
const userInfo = new UserInfo({
    profileNameSelector: '.profile__name',
    profileCaptionSelector: '.profile__caption'
});

// Создание попап для редактирования профиля


// const handleCardClick = function (name, image) {
//     popupImageZoom.open(name, image);
// }

//Редактирование профиля
const popupProfileEdit = new PopupWithForm('#popup__profile-edit',
    profileData => {
        userInfo.setUserInfo({
            profileName: profileData.profileName,
            profileCaption: profileData.profileCaption
        })
        popupProfileEdit.close();
    }
);










const popupCreateNewCard = new PopupWithForm('#popup__add-card', (formData)=> {
    const { title: name, link } = formData;
    renderInitialCard.addItem({ name , link });
    popupCreateNewCard.close();
    }
);




popupEditProfileOpenBtn.addEventListener('click',  function() {
    popupProfileEdit.open();
    const currentUserInfo = userInfo.getUserInfo();
    inputName.setAttribute('value', currentUserInfo.profileName);
    inputJob.setAttribute('value', currentUserInfo.profileCaption);
});

const addCardValidate = new FormValidator(enableValidation, popupCreatingCards);


const editProfileValidate = new FormValidator(enableValidation, popupEditingForm);


popupAddCardOpenBtn.addEventListener('click', function () {
    popupCreateNewCard.open();
    addCardValidate.disableSubmitButton();
});


//Слушатели:
popupImageZoom.setEventListeners();
popupProfileEdit.setEventListeners();
popupCreateNewCard.setEventListeners();


//Валидация:
editProfileValidate.enableValidation();
addCardValidate.enableValidation();