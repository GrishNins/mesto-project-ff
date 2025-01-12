// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard (card, deleteButton) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.alt;
  cardElement.querySelector('.card__title').textContent = card.name;
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click',() => deleteCard(cardElement));
  return cardElement;
}

// @todo: Функция удаления карточки
 function deleteCard() {
    remove(card);
 }

// @todo: Вывести карточки на страницу
card.forEach(function(element) {
placesList.append(cardElement);
})