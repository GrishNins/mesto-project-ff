import { openPopup } from "./modal.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
export function createCard(cardData, deleteCard, likeCard, openImage, userId) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikes = cardElement.querySelector(".card__likes"); // Исправленный селектор

  // Установка данных карточки
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardLikes.textContent = cardData.likes.length; // Теперь не вызывает ошибку

  // Обработчик для удаления карточки
  if (cardData.owner._id === userId) {
    deleteButton.addEventListener("click", () => deleteCard(cardElement));
  } else {
    deleteButton.remove();
  }

  // Обработчик для лайка
  likeButton.addEventListener("click", () => likeCard(likeButton, cardData, userId, cardLikes));

  // Проверка, лайкнул ли текущий пользователь карточку
  const isLiked = cardData.likes.some((like) => like._id === userId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  // Обработчик для открытия изображения
  cardImage.addEventListener("click", () => openImage(cardData.link, cardData.name));

  return cardElement;
}

// @todo: Функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Функция лайка
export function likeCard(likeButton, cardData, userId, cardLikes) {
  const isLiked = cardData.likes.some((like) => like._id === userId);

  if (isLiked) {
    likeButton.classList.remove("card__like-button_is-active");
    cardData.likes = cardData.likes.filter((like) => like._id !== userId); // Удаляем лайк пользователя
  } else {
    likeButton.classList.add("card__like-button_is-active");
    cardData.likes.push({ _id: userId }); // Добавляем лайк
  }

  cardLikes.textContent = cardData.likes.length; // Обновляем число лайков
}
