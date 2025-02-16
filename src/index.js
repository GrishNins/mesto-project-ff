import "./scripts/cards.js";
import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const profileEditPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");

const profileForm = profileEditPopup.querySelector(".popup__form");

const profileNameInput = document.querySelector(".popup__input_type_name");
const profileDescriptionInput = document.querySelector(".popup__input_type_description");

const newPlaceForm = document.querySelector('.popup__form[name="new-place"]');
const placeNameInput = newPlaceForm.querySelector(
  ".popup__input_type_card-name"
);
const placeLinkInput = newPlaceForm.querySelector(".popup__input_type_url");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const imagePopup = document.querySelector(".popup_type_image");

const popups = document.querySelectorAll(".popup");

// @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
  const card = createCard(element, deleteCard, likeCard, openImage);
  placesList.append(card);
});

// Обработчик событий для открытия попапов
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  openPopup(profileEditPopup);
});

// Обработчик событий для закрытия попапов
popupCloseButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const popup = e.target.closest(".popup");
    closePopup(popup);
  });
});

// Добавление новой карточки в начало списка
newPlaceForm.addEventListener("submit", function (event) {
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

// Открытие изображения
function openImage(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openPopup(imagePopup);
}

// Обработчик «отправки» формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = profileNameInput.value;
  const jobValue = profileDescriptionInput.value;

  profileName.textContent = nameValue;
  profileDescription.textContent = jobValue;
  closePopup(profileEditPopup);
}

// Закрытие попапа через оверлей

popups.forEach((popup) => {
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      closePopup(popup);
    }
  });
});

profileForm.addEventListener("submit", handleProfileFormSubmit);

profileAddButton.addEventListener("click", () => {
  openPopup(newCardPopup);
});