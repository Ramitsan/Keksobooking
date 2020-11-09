'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const avatarInputElement = document.querySelector(`#avatar`);
const avatarPreview = document.querySelector(`.ad-form-header__preview img`);
const formPhotosInputElement = document.querySelector(`#images`);
const formPhotosPreview = document.querySelector(`.ad-form__photo`);
const defaultPreview = `img/muffin-grey.svg`;

// создаем элемент фотографии
formPhotosPreview.style.display = `flex`;

formPhotosPreview.insertAdjacentHTML(`afterbegin`, `<img src="img/muffin-grey.svg" alt="Фотография жилья" width="50" height="50" style="margin: 10px;">`);
const photoElement = formPhotosPreview.firstChild;

// обработчик загрузки фотографий
const fileChooserHandler = (input, preview) => {
  input.addEventListener(`change`, () => {
    const file = input.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

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

fileChooserHandler(avatarInputElement, avatarPreview);
fileChooserHandler(formPhotosInputElement, photoElement);

window.chooserImage = {
  remove: removePreviews
};
