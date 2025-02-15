export function openPopup(popup) {
    popup.classList.add('popup_is-animated');
    setTimeout(() => {
      popup.classList.add('popup_is-opened'); 
    }, 600); 
    document.addEventListener('keydown', handleEscClose);
  }

// Функция для закрытия попапа
export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  setTimeout(() => {
    popup.classList.remove('popup_is-animated');
  }, 600);
  document.removeEventListener('keydown', handleEscClose);
  }
  
// Обработчик «отправки» формы
export function handleFormSubmit(evt, nameInput, jobInput, profileName, profileDescription) {
  evt.preventDefault(); 
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  
  profileName.textContent = nameValue;
  profileDescription.textContent = jobValue;
  closePopup(document.querySelector('.popup_type_edit'));
}
  
// Закрытие попапа через оверлей
export const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => {
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        closePopup(popup);
    }
  });
});
  
// Закрытие попапа нажатием на Esc
export const handleEscClose = (e) => {
  if (e.key === "Escape") {
      const popup = document.querySelector(".popup_is-opened"); 
      closePopup(popup);
  }
};
