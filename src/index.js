import "./pages/index.css"; // Импорт стилей
import { createCard, deleteCard, likeCard } from "./components/card.js"; // Функции для работы с карточками
import { openPopup, closePopup } from "./components/modal.js"; // Функции для работы с попапами
import { enableValidation, validationConfig } from "./components/validation.js"; // Валидация форм
import { getUserMe, getInitialCards, editProfile, addNewCard, deleteIdCard } from "./components/api.js"; // API-функции

// DOM-элементы
const placesList = document.querySelector(".places__list"); // Список карточек
const profileEditButton = document.querySelector(".profile__edit-button"); // Кнопка редактирования профиля
const profileAddButton = document.querySelector(".profile__add-button"); // Кнопка добавления карточки
const popupCloseButtons = document.querySelectorAll(".popup__close"); // Кнопки закрытия попапов

const profileEditPopup = document.querySelector(".popup_type_edit"); // Попап редактирования профиля
const newCardPopup = document.querySelector(".popup_type_new-card"); // Попап добавления карточки
const formElement = profileEditPopup.querySelector(".popup__form"); // Форма редактирования профиля

const profileNameInput = document.querySelector(".popup__input_type_name"); // Поле ввода имени
const profileDescriptionInput = document.querySelector(".popup__input_type_description"); // Поле ввода описания

const newPlaceForm = document.querySelector('.popup__form[name="new-place"]'); // Форма добавления карточки
const placeNameInput = newPlaceForm.querySelector(".popup__input_type_card-name"); // Поле ввода названия карточки
const placeLinkInput = newPlaceForm.querySelector(".popup__input_type_url"); // Поле ввода ссылки на картинку

const profileName = document.querySelector(".profile__title"); // Имя профиля
const profileDescription = document.querySelector(".profile__description"); // Описание профиля
const profileImage = document.querySelector(".profile__image"); // Аватар профиля

const popupImage = document.querySelector(".popup__image"); // Изображение в попапе
const popupCaption = document.querySelector(".popup__caption"); // Подпись к изображению
const imagePopup = document.querySelector(".popup_type_image"); // Попап с изображением

const popups = document.querySelectorAll(".popup"); // Все попапы

let userId = '4d951f7a0171ebece758d4f9';

// Функция открытия попапа редактирования профиля
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent; // Заполняем поля текущими данными
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditPopup); // Открываем попап
});

// Функция закрытия попапов
popupCloseButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const popup = e.target.closest(".popup"); // Находим ближайший попап
    closePopup(popup); // Закрываем его
  });
});

// Функция добавления новой карточки
newPlaceForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Отменяем стандартное поведение формы

  const name = placeNameInput.value; // Название карточки
  const link = placeLinkInput.value; // Ссылка на картинку

  if (name && link) {
    const submitButton = newPlaceForm.querySelector('.popup__button'); // Кнопка отправки
    submitButton.textContent = 'Сохранение...'; // Меняем текст кнопки

    // Отправляем данные на сервер
    addNewCard(name, link)
      .then((cardData) => {
        // Создаем новую карточку и добавляем её на страницу
        const newCard = createCard(cardData, deleteCard, likeCard, openImage, userId);
        placesList.prepend(newCard); // Добавляем карточку в начало списка

        closePopup(newCardPopup); // Закрываем попап
        newPlaceForm.reset(); // Сбрасываем форму
      })
      .catch((err) => {
        console.error('Ошибка при добавлении карточки:', err); // Логируем ошибку
      })
      .finally(() => {
        submitButton.textContent = 'Сохранить'; // Возвращаем текст кнопки
      });
  }
});

// Функция открытия изображения
function openImage(link, name) {
  popupImage.src = link; // Устанавливаем ссылку на изображение
  popupImage.alt = name; // Устанавливаем альтернативный текст
  popupCaption.textContent = name; // Устанавливаем подпись
  openPopup(imagePopup); // Открываем попап
}

// Функция редактирования профиля
function handleEditProfileSubmit(evt) {
  evt.preventDefault(); 

  const nameValue = profileNameInput.value;
  const aboutValue = profileDescriptionInput.value;

  const submitButton = formElement.querySelector('.popup__button'); 
  submitButton.textContent = 'Сохранение...'; 

  // Отправляем данные на сервер
  editProfile(nameValue, aboutValue)
    .then((userData) => {
      // Обновляем данные на странице
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;

      closePopup(profileEditPopup); // Закрываем попап
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
      closePopup(popup); // Закрываем попап
    }
  });
});

// Привязка обработчика формы редактирования профиля
formElement.addEventListener("submit", handleEditProfileSubmit);

// Открытие попапа добавления карточки
profileAddButton.addEventListener("click", () => {
  openPopup(newCardPopup);
});

// Включение валидации форм
enableValidation(validationConfig);

// Загрузка данных пользователя и карточек с сервера
Promise.all([getUserMe(), getInitialCards()])
  .then(([userData, cardsData]) => {
    // Устанавливаем данные пользователя
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.src = userData.avatar;

    // Сохраняем ID пользователя
    userId = userData._id;

    // Отображаем карточки на странице
    cardsData.forEach((card) => {
      const newCard = createCard(card, deleteCard, likeCard, openImage, userId);
      placesList.append(newCard);
    });
  })
  .catch((err) => {
    console.error('Ошибка при загрузке данных:', err); // Логируем ошибку
  });