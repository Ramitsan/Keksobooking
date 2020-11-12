'use strict';

const errorBackgroundColor = `rgba(255, 86, 53, 0.7)`;
const successPopup = document.querySelector(`#success`).content.querySelector(`.success`);
const errorPopup = document.querySelector(`#error`).content.querySelector(`.error`);
const mainElement = document.querySelector(`main`);


// закрытие окна по Esc
const clickEscHandler = (message) => {
  document.addEventListener(`keydown`, (e) => {
    if (window.util.isEscPress(e)) {
      message.remove();
    }
  })
};


// закрытие окна по клику на произвольной области
const clickEmptySpaceHandler = (message) => {
  document.addEventListener(`click`, (e) => {
    if (e.target === message) {
      message.remove();
    }
  });
}

// обработчик успешной загрузки
const success = successPopup.cloneNode(true);
const showSuccess = () => {
  mainElement.appendChild(success);

  // закрытие окна успешной загрузки по ESC
  closeEscHandler(success);

  // закрытие окна успешной загрузки по клику на произвольной области
  clickEmptySpaceHandler(success);
};


// обработчик ошибки
const error = errorPopup.cloneNode(true);
const showError = (textMessage) => {
  error.style.backgroundColor = errorBackgroundColor;
  mainElement.appendChild(error);

  error.querySelector(`.error__message`).textContent = textMessage;

  // закрытие окна ошибки по клику
  error.querySelector(`.error__button`).addEventListener(`click`, () => {
    error.remove();
  });

  // закрытие окна ошибки по Esc
  closeEscHandler(error);

  // закрытие окна ошибки по клику на произвольной области
  clickEmptySpaceHandler(error);
};

window.message = {
  showSuccess: showSuccess,
  showError: showError
};
