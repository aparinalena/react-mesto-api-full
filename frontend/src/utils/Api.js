export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._token = headers["authorization"];
    this._userUrl = `${this._baseUrl}/users/me`;
    this._cardsUrl = `${this._baseUrl}/cards`;
    this._likesUrl = `${this._baseUrl}/cards/likes`;
  }

  getUserInfo() {
    return fetch(this._userUrl, {
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }

  saveUserChanges(name, about) {
    return fetch(this._userUrl, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  getCards() {
    return fetch(this._cardsUrl, {
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }

  changeAvatar(src) {
    return fetch(`${this._userUrl}/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: src,
      }),
    }).then(this._checkResponse);
  }

  postCard(name, link) {
    return fetch(this._cardsUrl, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._cardsUrl}/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._likesUrl}/${cardId}`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._checkResponse(res));
  }

  likedCard(cardId) {
    return fetch(`${this._likesUrl}/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }

  dislikedCard(cardId) {
    return fetch(`${this._likesUrl}/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-26",
  headers: {
    authorization: "f33c969f-e357-4c49-a4b2-c8ed9c1630fb",
    "Content-Type": "application/json",
  },
});