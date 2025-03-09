const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-33',
    headers: {
      authorization: '26aada73-d121-43b7-ab4b-905a53a61acc',
      'Content-Type': 'application/json'
    }
  }
  
  function getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
  
  //Загружаем информацию о пользователе
  export const getUserMe = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'GET',
      headers: config.headers
    })
    .then(getResponseData);
  }
  
  //Загружаем карточки с сервера
  export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'GET',
      headers: config.headers
    })
    .then(getResponseData);
  };
  
  //Редактируем профиль
  export const editProfile = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(getResponseData);
  };
  
  //Добавляем карточку
  export const addNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(getResponseData);
  };
  
  //Удвляем свою карточку
  export const deleteIdCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then(getResponseData);
  };
  
  //Добавляем лайки
  export const addLikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers,
    })
    .then(getResponseData);
  };
  
  //Убираем лайки
  export const dislikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    })
    .then(getResponseData);
  };

//Редактирование аватарки
export const newAvatar = (avatarUrl) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarUrl
        }),
    })
    .then(getResponseData);
};
