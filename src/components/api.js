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

