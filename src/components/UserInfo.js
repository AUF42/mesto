class UserInfo {

    constructor({ profileNameSelector, profileCaptionSelector }) {
        this._profileName = document.querySelector(profileNameSelector);
        this._profileCaption = document.querySelector(profileCaptionSelector);
    }

    getUserInfo() {
        return {
            name: this._profileName.textContent,
            profession: this._profileCaption.textContent
        };
    }

    setUserInfo({ name, profession }) {
        this._profileName.textContent = name;
        this._profileCaption.textContent = profession;
    }
}

export { UserInfo };