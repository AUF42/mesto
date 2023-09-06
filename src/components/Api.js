class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    };

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
        })
            .then(this._checkResponse);
    }

    addCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            }),
        })
            .then(res => this._checkResponse(res))
    };

    getUserInfoApi() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
        })
            .then(this._checkResponse);
    }

    setUserInfoApi({ name, profession }) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: profession,
            }),
        })
            .then( this._checkResponse);
    }

    setUserAvatar({ avatar }) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar,
            }),
        })
            .then(this._checkResponse);
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(res => this._checkResponse(res))
    }

    putCardLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
            .then(res => this._checkResponse(res))
    }

    deleteCardLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(res => this._checkResponse(res))
    }

}

export { Api };