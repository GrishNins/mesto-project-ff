import { openPopup } from "./modal.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
export function createCard(card, removeCard, likeCard, openImage) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  const removeButton = cardElement.querySelector(".card__delete-button");
  removeButton.addEventListener("click", function () {
    removeCard(cardElement);
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
    likeCard(likeButton);
  });

  // Открытие изображения
  cardImage.addEventListener("click", function () {
    openImage(card.link, card.name);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}

// Лайк
export function likeCard(likeButton) {
  likeButton.classList.add("card__like-button_is-active");
}
