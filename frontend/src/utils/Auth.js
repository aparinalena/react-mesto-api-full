export const BASE_URL = "https://api.mesto.aparinalena.nomoredomains.work";

const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/sign-up`, {
    method: "POST",
    credentials: 'include',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => getResponse(res));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/sign-in`, {
    credentials: 'include',
    method: "POST",
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => getResponse(res));
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    credentials: 'include',
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => getResponse(res));
};
