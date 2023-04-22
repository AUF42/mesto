const popupEditProfile = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const popupCloseBtn = popup.querySelector('.popup__close-button');
const popupForm = popup.querySelector('.popup__form')

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__caption');
let inputName = document.querySelector('#input-name');
let inputJob = document.querySelector('#input-profile-caption');


const popupOpen = function () {
    popup.classList.add('popup_opened');
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
}

const popupClose = function () {
    popup.classList.remove('popup_opened');
}

const formSubmitHandler = function (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    popupClose();
}

popupEditProfile.addEventListener('click', popupOpen);
popupCloseBtn.addEventListener('click', popupClose);
popupForm.addEventListener('submit', formSubmitHandler);