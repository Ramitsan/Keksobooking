'use strict';

const avatarInputElement = document.querySelector(`#avatar`);
const avatarPreview = document.querySelector(`.ad-form-header__preview img`);
const formPhotosInputElement = document.querySelector(`#images`);
const formPhotosPreview = document.querySelector(`.ad-form__photo`);
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const defaultPreview = `img/muffin-grey.svg`;

// создаем элемент фотографии
formPhotosPreview.style.display = `flex`;

formPhotosPreview.insertAdjacentHTML(`afterbegin`, `<img src="img/muffin-grey.svg" alt="Фотография жилья" width="50" height="50" style="margin: 10px;">`);
const photoElement = formPhotosPreview.firstChild;

// обработчик загрузки фотографий
const fileChoserHandler = (input, preview) => {
  input.addEventListener(`change`, function () {
    const file = input.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener(`load`, function () {
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

fileChoserHandler(avatarInputElement, avatarPreview);
fileChoserHandler(formPhotosInputElement, photoElement);

window.chooserImage = {
  remove: removePreviews
};
