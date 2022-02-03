export class Api {
  constructor(config) {
    this.url = config.baseUrl;
    this.headers = config.headers;
  }

  getUserInfo() {
    return fetch(this.url + "/users/me", {
      credentials: "include",
      headers: this.headers,
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
    return fetch(this.url + "/cards", {
      credentials: "include",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  changeAvatar(data) {
    return fetch(this.url + "/users/me/avatar", {
      method: "PATCH",
      credentials: "include",
      headers: this.headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  postCard(data) {
    return fetch(this.url + "/cards", {
      method: "POST",
      credentials: "include",
      headers: this.headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(this.url + `/cards/${cardId}`, {
      method: "DELETE",
      credentials: "include",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(this.url + `/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      credentials: "include",
      headers: this.headers,
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
  baseUrl:
    process.env.NODE_ENV === "production"
      ? "https://api.mesto.aparinalena.nomoredomains.work"
      : "http://localhost:3000",
  headers: {
    Authorization: `Bearer ${document.cookie.slice(4)}`,
    "Content-Type": "application/json",
  },
});