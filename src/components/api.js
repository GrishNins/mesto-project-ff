//настройки входа
const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-33',
    headers: {
        authorization: '26aada73-d121-43b7-ab4b-905a53a61acc',
        'Content-Type': 'application/json'
    }
}

//получение данных с сервера
function getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  }

//информация о пользователе
export const getUserMe =() => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'GET',
      headers: config.headers
    })
    .then(getResponseData);
  }

  //карточки с сервера
  export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'GET',
      headers: config.headers
    })
    .then(getResponseData);
  };

//редактирование профиля
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

  // Добавление новой карточки на сервер
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

//Удаление своей карточки
// Удаление карточки с сервера
export const deleteIdCard= (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then(getResponseData);
};
