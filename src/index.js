import './scripts/cards.js';
import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, openImage, likeCard } from './components/card.js';
import { openPopup, closePopup, handleFormSubmit, popups, handleEscClose } from './components/modal.js';

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupCloseButton = document.querySelectorAll('.popup__close');
const profileEditPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');

const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const newPlaceForm = document.querySelector('.popup__form[name="new-place"]');
const placeNameInput = newPlaceForm.querySelector('.popup__input_type_card-name');
const placeLinkInput = newPlaceForm.querySelector('.popup__input_type_url');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// @todo: Вывести карточки на страницу
initialCards.forEach(element => {
  const card = createCard(element, deleteCard, likeCard, openImage);
  placesList.append(card);
});

// Обработчик событий для открытия попапов
profileEditButton.addEventListener('click', () => { 
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  openPopup(profileEditPopup);
});

// Обработчик событий для закрытия попапов
popupCloseButton.forEach(button => {
  button.addEventListener('click', (e) => {
    const popup = e.target.closest('.popup');
    closePopup(popup);
  });
});

 // Добавление новой карточки в начало списка
 newPlaceForm.addEventListener('submit', function (event) {
  event.preventDefault(); 

  const name = placeNameInput.value;
  const link = placeLinkInput.value;

  if (name && link) {
    const newCard = createCard({ name, link }, deleteCard, likeCard, openImage);
    placesList.prepend(newCard); 

    closePopup(newCardPopup);
    newPlaceForm.reset();
  }
}); 

formElement.addEventListener('submit', (evt) => {
  handleFormSubmit(evt, nameInput, jobInput, profileName, profileDescription);
});

  addButton.addEventListener('click', () => {
    openPopup(newCardPopup);
  });