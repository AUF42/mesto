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

// Форма редактирования профиля
const popupEditProfileOpenBtn = document.querySelector('.profile__edit');
const popupEditingForm = document.querySelector('#popup__profile-edit');

// Форма добавления карточки
const popupAddCardOpenBtn = document.querySelector('.profile__add-button');
const popupCreatingCards = document.querySelector('#popup__add-card');

const cardsContainer = '.elements';

const enableValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input_type_visible'
};

export {
    popupEditProfileOpenBtn,
    popupEditingForm,
    popupAddCardOpenBtn,
    popupCreatingCards,
    cardsContainer,
    enableValidation
}