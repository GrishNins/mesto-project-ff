import './scripts/cards.js';
import './pages/index.css';
import { initialCards } from './scripts/cards.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard (card, removeCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  cardImage.src = card.link;
  cardTitle.alt = card.name;
  cardTitle.textContent = card.name;

  const removeButton = cardElement.querySelector('.card__delete-button');
  removeButton.addEventListener('click', function() {
    removeCard(cardElement);
});

  return cardElement;
}

// @todo: Функция удаления карточки
 function deleteCard(cardElement) {
     cardElement.remove();
 }

// @todo: Вывести карточки на страницу
initialCards.forEach(element => {
    const card = createCard(element, deleteCard);
    placesList.append(card);})
