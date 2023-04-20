const popupEditProfile = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const popupCloseBtn = popup.querySelector('.popup__close-button');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__caption');
let inputName = document.querySelector('#input-name');
let inputJob = document.querySelector('#input-profile-caption');


const popupToggle = function () {
    popup.classList.toggle('popup__open');
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
}

const formSubmitHandler = function (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    popupToggle();
}

popupEditProfile.addEventListener('click', popupToggle);
popupCloseBtn.addEventListener('click', popupToggle);
popupEditProfile.addEventListener('submit', formSubmitHandler);