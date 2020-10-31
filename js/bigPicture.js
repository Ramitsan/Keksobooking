'use strict';

(function() {
  let overlay;
  let buttonClose;

  const openBigPicture = function(preview) {

    const imageElement = document.createElement('img');
    imageElement.src = preview.src;
    imageElement.style.width = `auto`;
    imageElement.style.height = `auto`;

    imageElement.style.border = `10px solid #ffffff`;

    overlay = createOverlay();
    buttonClose = createButtonClose();
    document.body.appendChild(overlay);
    document.body.appendChild(buttonClose);
    // overlay.appendChild(imageElement);

    imageElement.onload = function() {
      overlay.appendChild(imageElement)
    };

    overlay.addEventListener('click', closeBigPicture);
    buttonClose.addEventListener('click', closeBigPicture);
  };

  const closeBigPicture = function(e) {
    if (e.target === overlay || e.target === buttonClose) {
      overlay.remove();
      buttonClose.remove();
      overlay.removeEventListener(`click`, closeBigPicture);
      buttonClose.removeEventListener(`click`, closeBigPicture);
    }
  };

  //  работает, но закрывает и фото, и карточку объявления, а нужно только карточку
  window.addEventListener(`keydown`, function(e) {
    if (window.util.isEscPress(e) && (overlay)) {
      // e.stopPropagation();
      overlay.remove();
      buttonClose.remove();
      overlay.removeEventListener(`click`, closeBigPicture);
      buttonClose.removeEventListener(`click`, closeBigPicture);
    }
  });

  // создаем оверлей
  const createOverlay = function() {
    let overlayElement = document.createElement('div');
    overlayElement.style.position = `fixed`;
    overlayElement.style.backgroundColor = 'rgba(0,0,0,0.8)';
    overlayElement.style.left = 0;
    overlayElement.style.top = 0;
    overlayElement.style.right = 0;
    overlayElement.style.bottom = 0;
    overlayElement.style.zIndex = 99;
    overlayElement.style.display = `flex`;
    overlayElement.style.alignItems = `center`;
    overlayElement.style.justifyContent = `center`;
    return overlayElement;
  }

  // создаем кнопку закрытия
  const createButtonClose = function() {
    let buttonElement = document.createElement(`button`);
    buttonElement.style.position = `fixed`;
    buttonElement.style.backgroundColor = `transparent`;
    buttonElement.style.right = `15%`;
    buttonElement.style.top = `15%`;
    buttonElement.style.width = `55px`;
    buttonElement.style.height = `65px`;
    buttonElement.style.display = `block`;
    buttonElement.style.border = `1px solid transparent`;
    buttonElement.style.fontSize = `50px`;
    buttonElement.textContent = `×`;
    buttonElement.style.color = `#ffffff`;
    buttonElement.style.padding = `0`;
    buttonElement.style.backgroundPosition = `center`;
    buttonElement.style.backgroundRepeat = `no-repeat`;
    buttonElement.style.cursor = `pointer`;
    buttonElement.style.zIndex = `100`;
    return buttonElement;
  }

  window.bigPicture = {
    open: openBigPicture
  };

})();
