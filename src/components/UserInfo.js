class UserInfo {

    constructor({ profileNameSelector, profileCaptionSelector }) {
        this._profileName = document.querySelector(profileNameSelector);
        this._profileCaption = document.querySelector(profileCaptionSelector);
    }

    getUserInfo() {
        return {
            profileName: this._profileName.textContent,
            profileCaption: this._profileCaption.textContent
        };
    }

    setUserInfo({ profileName, profileCaption }) {
        this._profileName.textContent = profileName;
        this._profileCaption.textContent = profileCaption;
    }
}

export { UserInfo };