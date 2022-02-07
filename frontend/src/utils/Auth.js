export const BASE_URL = "https://api.mesto.aparinalena.nomoredomains.work";

function getResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: 'include',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      password,
      email, 
    }),
  })
    .then((response) => {
      return getResponse(response);
    })
    .then((data) => {
      return data;
    });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password,
      email,
    }),
  })
    .then((response) => {
      return getResponse(response);
    })
    .then((data) => {
      return data;
    });
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
  })
    .then((response) => {
      return getResponse(response);
    })
    .then((res) => {
      if (res) {
        return res;
      }
    });
};