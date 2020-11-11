'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const defaultPreview = `img/muffin-grey.svg`;
const avatarInputElement = document.querySelector(`#avatar`);
const avatarPreview = document.querySelector(`.ad-form-header__preview img`);
const formPhotosInputElement = document.querySelector(`.ad-form__input`);
const formPhotosPreview = document.querySelector(`.ad-form__photo`);

// создаем элемент фотографии
formPhotosPreview.style.display = `flex`;

formPhotosPreview.insertAdjacentHTML(`afterbegin`, `<img src="img/muffin-grey.svg" alt="Фотография жилья" width="50" height="50" style="margin: 10px;">`);
const photoElement = formPhotosPreview.firstChild;

// обработчик загрузки фотографий
const addImagePreview = (input, preview) => {
  input.addEventListener(`change`, () => {
    const file = input.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, () => {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
};

const removePreviews = () => {
  avatarPreview.src = defaultPreview;
  photoElement.src = defaultPreview;
};

addImagePreview(avatarInputElement, avatarPreview);
addImagePreview(formPhotosInputElement, photoElement);

window.chooserImage = {
  remove: removePreviews
};
