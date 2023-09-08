import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards } from '../utils/initialCards.js';
import { Card } from '../components/Card.js';
import './index.css';
import {
    apiConfig,
    cardsContainer, enableValidation,
    popupAddCardOpenBtn,
    popupCreatingCards,
    popupEditingForm,
    popupEditProfileOpenBtn,
    popupEditAvatar,
    popupDeleteCard,
    popupEditingFormAvatar
} from '../utils/constants';
import { Api } from '../components/Api';
import {PopupLoading} from "../components/PopupLoading";

const api = new Api(apiConfig);
const addCardValidate = new FormValidator(enableValidation, popupCreatingCards);
const editProfileValidate = new FormValidator(enableValidation, popupEditingForm);

editProfileValidate.enableValidation();
addCardValidate.enableValidation();

// Форма профиля
const userInfo = new UserInfo({
    profileNameSelector: '.profile__name',
    profileCaptionSelector: '.profile__caption',
    profileAvatarSelector: '.profile__avatar'
});

// Форма zoom
const popupImageZoom = new PopupWithImage('#image-popup');
popupImageZoom.setEventListeners();

Promise.all([api.getUserInfoApi(), api.getInitialCards()])
    .then(([user, cards]) => {
        userId = user._id;
        userInfo.setUserInfo(user);
        renderInitialCard.renderItems(cards);
    })
    .catch((err) => alert(err))
    .finally(() => {})
let userId;

const createCard = (data) => {
    const card = new Card(data.name, data.link, '#element-template', () => {
        popupImageZoom.open(data.name, data.link);
    });
    return card.createCard();
}

// Создание новой карточки
const popupCreateNewCard = new PopupWithForm('#popup__add-card', (item) => {
        popupCreateNewCard.renderLoading(true);
        api
            .addCard(item)
            .then((data) => {
                renderInitialCard.addItem(createCard(item));
    })
        .catch((err) => console.log(err))
        .finally(() => popupCreateNewCard.renderLoading(false));
});
popupCreateNewCard.setEventListeners();

popupAddCardOpenBtn.addEventListener('click', function () {
    popupCreateNewCard.open();
    addCardValidate.disableSubmitButton();
});

// Создание секции и отображение карточек
const renderInitialCard = new Section({
    renderer: (cardInfo) => {
        renderInitialCard.addItem(createCard(cardInfo));
    },
}, cardsContainer);

renderInitialCard.renderItems(initialCards);

//Редактирование профиля
const popupProfileEdit = new PopupWithForm('#popup__profile-edit', ({ name, profession }) => {
    popupProfileEdit.renderLoading(true);
    api
        .setUserInfoApi({ name, profession })
        .then((data) => {
            userInfo.setUserInfo(data)
        })
        .catch((err) => console.log(err))
        .finally(() =>  popupProfileEdit.renderLoading(false));
});

popupProfileEdit.setEventListeners();

popupEditProfileOpenBtn.addEventListener('click', () => {
    popupProfileEdit.setInputValues(userInfo.getUserInfo());
    popupProfileEdit.open();
});


const editAvatarValidate = new FormValidator(enableValidation, popupEditingFormAvatar);
editAvatarValidate.enableValidation();

const popupAvatar = new PopupWithForm('#popup-edit-avatar', ( { avatar } )  => {
    popupAvatar.renderLoading(true);
    api
        .setUserAvatar( {avatar} )
        .then((data) => {
            userInfo.setUserInfo(data);
        })
        .catch((err) => console.log(err))
        .finally(() => popupAvatar.renderLoading(false));
});
popupAvatar.setEventListeners();

popupEditAvatar.addEventListener('click', function () {
    popupAvatar.open();
    editAvatarValidate.disableSubmitButton();
});

// const popupFormDelete = new PopupLoading('#popup-confirmation', ()  =>{
//     popupFormDelete.renderLoading(true);
//     api.deleteCard(id)
//         .then(() => {
//             card.deleteCard();
//             popupFormDelete.close();
//         })
//         .catch((err) => alert(err))
//         .finally(() => {
//             popupFormDelete.renderLoading(false);
//         })
// })
//
// popupFormDelete.setEventListeners();
//
// popupDeleteCard.addEventListener('click', function () {
//     popupFormDelete.open();
// });





// const PopupLoading = new PopupLoading('#popup-confirmation');
// PopupLoading.setEventListeners();