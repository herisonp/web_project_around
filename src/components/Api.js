export class Api {
  constructor(baseUrl, options) {
    this._baseUrl = baseUrl;
    this._options = options;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      ...this._options,
    }).then((res) => {
      if (!res.ok) Promise.reject(`Error: ${res.status}`);
      return res.json();
    });
  }

  postCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      body: JSON.stringify(card),
      ...this._options,
    }).then((res) => {
      if (!res.ok) Promise.reject(`Error: ${res.status}`);
      return res.json();
    });
  }

  deleteCardById(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      ...this._options,
    }).then((res) => {
      if (!res.ok) Promise.reject(`Error: ${res.status}`);
      return { status: res.status };
    });
  }

  likeCardById(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "PUT",
      ...this._options,
    }).then((res) => {
      if (!res.ok) Promise.reject(`Error: ${res.status}`);
      return res.json();
    });
  }

  deleteLikeCardById(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "DELETE",
      ...this._options,
    }).then((res) => {
      if (!res.ok) Promise.reject(`Error: ${res.status}`);
      return res.json();
    });
  }

  getLoggedUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      ...this._options,
    }).then((res) => {
      if (!res.ok) Promise.reject(`Error: ${res.status}`);
      return res.json();
    });
  }

  editUser(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      body: JSON.stringify(data),
      ...this._options,
    }).then((res) => {
      if (!res.ok) Promise.reject(`Error: ${res.status}`);
      return res.json();
    });
  }

  editAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify(avatar),
      ...this._options,
    }).then((res) => {
      if (!res.ok) Promise.reject(`Error: ${res.status}`);
      return res.json();
    });
  }
}
