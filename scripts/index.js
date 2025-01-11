// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard (card, deleteCard) {
const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
cardElement.querySelector('.card__image').src = card.link;
cardElement.querySelector('.card__image').alt = card.alt;
cardElement.querySelector('.card__title').textContent = card.name;
const removeCard = cardElement.querySelector('.card__delete-button');
removeCard.addEventListener('click', function(){
    removeCard(card)});
return cardElement;
}

// @todo: Функция удаления карточки


// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
    renderCard(createCard('.card'))
})