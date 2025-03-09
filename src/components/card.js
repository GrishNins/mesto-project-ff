import { openPopup } from "./modal.js";
import { addLikeCard, dislikeCard, deleteIdCard } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;

export function createCard(cardData, openConfirmDeletePopup, likeCard, openImage, userId) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikes = cardElement.querySelector(".card__likes");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardLikes.textContent = cardData.likes.length;

  if (cardData.owner._id === userId) {
    deleteButton.addEventListener("click", () => openConfirmDeletePopup(cardElement, cardData._id));
  } else {
    deleteButton.remove();
  }

  likeButton.addEventListener("click", () => likeCard(likeButton, cardData._id, cardLikes));

  const isLiked = cardData.likes.some((like) => like._id === userId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  cardImage.addEventListener("click", () => openImage(cardData.link, cardData.name));

  return cardElement;
}

export function likeCard(likeButton, cardId, cardLikes) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  if (isLiked) {
    dislikeCard(cardId)
      .then((updatedCard) => {
        likeButton.classList.remove("card__like-button_is-active");
        cardLikes.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.error('Ошибка при снятии лайка:', err);
      });
  } else {
    addLikeCard(cardId)
      .then((updatedCard) => {
        likeButton.classList.add("card__like-button_is-active");
        cardLikes.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.error('Ошибка при постановке лайка:', err);
      });
  }
}