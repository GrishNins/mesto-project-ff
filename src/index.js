import "./pages/index.css";
import { createCard, likeCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation, validationConfig } from "./components/validation.js";
import { getUserMe, getInitialCards, editProfile, addNewCard, deleteIdCard, addLikeCard, dislikeCard } from "./components/api.js";

// DOM-элементы
const placesList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupCloseButtons = document.querySelectorAll(".popup__close");

const profileEditPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const formElement = profileEditPopup.querySelector(".popup__form");

const profileNameInput = document.querySelector(".popup__input_type_name");
const profileDescriptionInput = document.querySelector(".popup__input_type_description");

const newPlaceForm = document.querySelector('.popup__form[name="new-place"]');
const placeNameInput = newPlaceForm.querySelector(".popup__input_type_card-name");
const placeLinkInput = newPlaceForm.querySelector(".popup__input_type_url");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const imagePopup = document.querySelector(".popup_type_image");

const popups = document.querySelectorAll(".popup");

const confirmDeletePopup = document.querySelector(".popup_type_confirm");
const confirmDeleteForm = document.querySelector('.popup__form[name="confirm-delete"]');

let userId = null;
let cardToDelete = null;

// Функция открытия попапа редактирования профиля
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditPopup);
});

// Функция закрытия попапов
popupCloseButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const popup = e.target.closest(".popup");
    closePopup(popup);
  });
});

// Функция добавления новой карточки
newPlaceForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = placeNameInput.value;
  const link = placeLinkInput.value;

  if (name && link) {
    const submitButton = newPlaceForm.querySelector('.popup__button');
    submitButton.textContent = 'Сохранение...';

    addNewCard(name, link)
      .then((cardData) => {
        const newCard = createCard(cardData, openConfirmDeletePopup, likeCard, openImage, userId);
        placesList.prepend(newCard);

        closePopup(newCardPopup);
        newPlaceForm.reset();
      })
      .catch((err) => {
        console.error('Ошибка при добавлении карточки:', err);
      })
      .finally(() => {
        submitButton.textContent = 'Сохранить';
      });
  }
});

// Функция открытия изображения
function openImage(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openPopup(imagePopup);
}

// Функция редактирования профиля
function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  const nameValue = profileNameInput.value;
  const aboutValue = profileDescriptionInput.value;

  const submitButton = formElement.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';

  editProfile(nameValue, aboutValue)
    .then((userData) => {
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileImage.src = userData.avatar; 

      closePopup(profileEditPopup);
    })
    .catch((err) => {
      console.error('Ошибка при обновлении профиля:', err);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
    });
}

// Закрытие попапа по клику на оверлей
popups.forEach((popup) => {
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      closePopup(popup);
    }
  });
});

// Привязка обработчика формы редактирования профиля
formElement.addEventListener("submit", handleEditProfileSubmit);

// Открытие попапа добавления карточки
profileAddButton.addEventListener("click", () => {
  openPopup(newCardPopup);
});

// Функция для открытия попапа подтверждения удаления
function openConfirmDeletePopup(cardElement, cardId) {
  cardToDelete = { cardElement, cardId };
  openPopup(confirmDeletePopup);
}

// Обработчик подтверждения удаления карточки
confirmDeleteForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (cardToDelete) {
    const { cardElement, cardId } = cardToDelete;

    deleteIdCard(cardId)
      .then(() => {
        cardElement.remove();
        closePopup(confirmDeletePopup);
      })
      .catch((err) => {
        console.error('Ошибка при удалении карточки:', err);
      })
      .finally(() => {
        cardToDelete = null;
      });
  }
});

// Включение валидации форм
enableValidation(validationConfig);

// Загрузка данных пользователя и карточек с сервера
Promise.all([getUserMe(), getInitialCards()])
  .then(([userData, cardsData]) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.src = userData.avatar;

    userId = userData._id;

    cardsData.forEach((card) => {
      const newCard = createCard(card, openConfirmDeletePopup, likeCard, openImage, userId);
      placesList.append(newCard);
    });
  })
  .catch((err) => {
    console.error('Ошибка при загрузке данных:', err);
  });