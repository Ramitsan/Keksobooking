'use strict';

const successPopup = document.querySelector(`#success`).content.querySelector(`.success`);
const errorPopup = document.querySelector(`#error`).content.querySelector(`.error`);


const success = successPopup.cloneNode(true);
const showSuccess = () => {
  document.querySelector(`main`).appendChild(success);
};

// закрытие окна успешной загрузки по ESC
document.addEventListener(`keydown`, (e) => {
  if (window.util.isEscPress(e)) {
    success.remove();
  }
});

// по клику на произвольной области
document.addEventListener(`click`, (e) => {
  if (e.target === success) {
    success.remove();
  }
});

// обработчик ошибки
const error = errorPopup.cloneNode(true);

const showError = (textMessage) => {
  error.style.backgroundColor = `rgba(255, 86, 53, 0.7)`;
  document.querySelector(`main`).appendChild(error);

  error.querySelector(`.error__message`).textContent = textMessage;
};

// закрытие окна об ошибке по клику
error.querySelector(`.error__button`).addEventListener(`click`, () => {
  error.remove();
});

// по ESC
document.addEventListener(`keydown`, (e) => {
  if (window.util.isEscPress(e)) {
    error.remove();
  }
});

// по клику на произвольной области
document.addEventListener(`click`, (e) => {
  if (e.target === error) {
    error.remove();
  }
});

window.message = {
  showSuccess,
  showError
};
