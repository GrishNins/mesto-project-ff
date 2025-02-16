export function openPopup(popup) {
  popup.classList.add("popup_is-animated");
  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 0);
  document.addEventListener("keydown", handleEscClose);
}

// Функция для закрытия попапа
export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  setTimeout(() => {
    popup.classList.remove("popup_is-animated");
  }, 600);
  document.removeEventListener("keydown", handleEscClose);
}

// Закрытие попапа нажатием на Esc
export const handleEscClose = (e) => {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closePopup(popup);
  }
};
