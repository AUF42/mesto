import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
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
    popupEditingFormAvatar
} from '../utils/constants';
import { Api } from '../components/Api';
import {PopupLoading} from "../components/PopupLoading";

const api = new Api(apiConfig);
const addCardValidate = new FormValidator(enableValidation, popupCreatingCards);
const editProfileValidate = new FormValidator(enableValidation, popupEditingForm);
const editAvatarValidate = new FormValidator(enableValidation, popupEditingFormAvatar);
const popupImageZoom = new PopupWithImage('#image-popup');

addCardValidate.enableValidation();
editProfileValidate.enableValidation();
editAvatarValidate.enableValidation();
popupImageZoom.setEventListeners();

// Форма профиля
const userInfo = new UserInfo({
    profileNameSelector: '.profile__name',
    profileCaptionSelector: '.profile__caption',
    profileAvatarSelector: '.profile__avatar'
});

Promise.all([api.getUserInfoApi(), api.getInitialCards()])
    .then(([user, cardElement]) => {
        userId = user._id;
        userInfo.setUserInfo(user);
        renderInitialCard.renderItems(cardElement.reverse());
    })
    .catch((err) => alert(err))
    .finally(() => {})
let userId;

const createCard = (cardElement) => {
    const card = new Card(cardElement, '#element-template', userId, { cardId: cardElement._id, ownerId: cardElement.owner._id },
        {
            handleCardZoom: (name, link) => {
                popupImageZoom.open(name, link)
            },
            handleCardDelete: (cardElement, cardId) => {
                popupFormDelete.open(cardElement, cardId)
            },
            handleCardLike: (cardId) => {
                api.putCardLike(cardId)
                    .then((res) => {
                        card.renderCardLike(res);
                    })
                    .catch((err) => {
                        console.log(`При выставлении лайка произошла ошибка, ${err}`)
                    })
            },
            handleCardDeleteLike: (cardId) => {
                api.deleteCardLike(cardId)
                    .then((res) => {
                        card.renderCardLike(res);
                    })
                    .catch((err) => {
                        console.log(`При снятии лайка произошла ошибка, ${err}`)
                    })
            },
        });
    return card.createCard();
}

// Создание секции и отображение карточек
const renderInitialCard = new Section({
    renderer: (cardElement) => {
        renderInitialCard.addItem(createCard(cardElement));
    },
}, cardsContainer);


const popupFormDelete = new PopupLoading('#popup-confirmation', {
    callbackNotice: (cardElement, cardId) => { api.deleteCard(cardId)
        .then(() => {
            cardElement.deleteCard();
            popupFormDelete.close();
        })
        .catch((err) => { console.log(`При удалении карточки возникла ошибка, ${err}`) })
    }
});
popupFormDelete.setEventListeners();


// Создание новой карточки
const popupCreateNewCard = new PopupWithForm('#popup__add-card',
    (formValues) => {
        popupCreateNewCard.renderLoading(true);
        api
            .addCard( {name: formValues.name, link:formValues.link} )
            .then((card) => {
                renderInitialCard.addItem(createCard(card));
                popupCreateNewCard.close();
    })
        .catch((err) => console.log(err))
        .finally(() => popupCreateNewCard.renderLoading(false));
});
popupCreateNewCard.setEventListeners();

popupAddCardOpenBtn.addEventListener('click', function () {
    popupCreateNewCard.open();
    addCardValidate.disableSubmitButton();
});

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

