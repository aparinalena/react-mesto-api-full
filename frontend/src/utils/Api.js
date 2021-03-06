export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    // this._token = headers["authorization"];
    this._headers = options.headers;
    this._userUrl = `${this._baseUrl}/users/me`;
    this._cardsUrl = `${this._baseUrl}/cards`;
  }

  getUserInfo() {
    return fetch(this._userUrl, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      return this._checkResponse(response);
    });
  }

  saveUserChanges(data) {
    return fetch(this._userUrl, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }).then((response) => {
      return this._checkResponse(response);
    });
  }

  getCards() {
    return fetch(this._cardsUrl, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      return this._checkResponse(response);
    });
  }

  changeAvatar(url) {
    return fetch(`${this._userUrl}/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(url),
    }).then((response) => {
      return this._checkResponse(response);
    });
  }

  postCard(data) {
    return fetch(this._cardsUrl, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }).then((response) => {
      return this._checkResponse(response);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._cardsUrl}/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      return this._checkResponse(response);
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      return this._checkResponse(response);
    });
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`????????????: ${res.status}`);
  }
}

const api = new Api({
  baseUrl: "https://api.mesto.aparinalena.nomoredomains.work",
});

export default api;