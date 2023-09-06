class UserInfo {

    constructor({ profileNameSelector, profileCaptionSelector, profileAvatarSelector }) {
        this._profileName = document.querySelector(profileNameSelector);
        this._profileCaption = document.querySelector(profileCaptionSelector);
        this._avatar = document.querySelector(profileAvatarSelector);
    }

    getUserInfo() {
        return {
            name: this._profileName.textContent,
            profession: this._profileCaption.textContent,
        };
    }

    setUserInfo({ name, about, avatar }) {
        this._profileName.textContent = name;
        this._profileCaption.textContent = about;
        this._avatar.style.backgroundImage = `url(${avatar})`;
    }
}

export { UserInfo };