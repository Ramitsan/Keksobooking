'use strict';

(function () {

  const successPopup = document.querySelector(`#success`).content.querySelector(`.success`);
  const errorPopup = document.querySelector(`#error`).content.querySelector(`.error`);


  const success = successPopup.cloneNode(true);
  const showSuccess = () => {
    document.body.insertAdjacentElement(`afterbegin`, success);
  };

  // закрытие окна успешной загрузки по ESC
  document.addEventListener(`keydown`, function (e) {
    if (window.util.isEscPress(e)) {
      success.remove();
    }
  });

  // по клику на произвольной области
  document.addEventListener(`click`, function (e) {
    if (e.target === success) {
      success.remove();
    }
  });

  // обработчик ошибки
  const error = errorPopup.cloneNode(true);
  const showError = (errorMessage) => {
    error.style = `text-align: center`;
    error.style.display = `block`;
    error.style.position = `fixed`;
    error.style.zIndex = `100`;
    error.style.width = `100%`;
    error.style.backgroundColor = `rgba(255, 86, 53, 0.8)`;
    error.style.color = `#fff`;
    error.style.fontSize = `25px`;
    error.style.fontWeight = `bold`;
    error.style.lineHeight = `65px`;
    error.style.textAlign = `center`;

    error.querySelector(`.error__message`).textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, error);
  };

  // закрытие окна об ошибке по клику
  error.querySelector(`.error__button`).addEventListener(`click`, function () {
    error.remove();
  });

  // по ESC
  document.addEventListener(`keydown`, function (e) {
    if (window.util.isEscPress(e)) {
      error.remove();
    }
  });

  // по клику на произвольной области
  document.addEventListener(`click`, function (e) {
    if (e.target === error) {
      error.remove();
    }
  });


  window.message = {
    showSuccess: showSuccess,
    showError: showError
  };

})();
