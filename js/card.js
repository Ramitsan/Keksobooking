'use strict';

const card = document.querySelector(`#card`).content.querySelector(`.map__card`);
const typesOfHousing = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  house: `Дом`,
  palace: `Дворец`
};

const documentEscapePressHandler = (e) => {
  if (window.util.isEscPress(e)) {
    removeCard();
  }
};

const createCard = (announcement) => {
  const popup = card.cloneNode(true);

  popup.querySelector(`.popup__title`).textContent = announcement.offer.title;
  popup.querySelector(`.popup__text--address`).textContent = announcement.offer.address;
  popup.querySelector(`.popup__text--price`).textContent = `${announcement.offer.price}₽/ночь`;
  popup.querySelector(`.popup__type`).textContent = typesOfHousing[announcement.offer.type];
  popup.querySelector(`.popup__text--capacity`).textContent = `${announcement.offer.rooms} комнаты для ${announcement.offer.guests} гостей`;
  popup.querySelector(`.popup__text--time`).textContent = `Заезд после ${announcement.offer.checkin}, выезд до ${announcement.offer.checkout}`;
  popup.querySelector(`.popup__description`).textContent = announcement.offer.description;
  popup.querySelector(`.popup__avatar`).src = announcement.author.avatar;

  createFeaturesBlock(popup, announcement);
  createPhotosBlock(popup, announcement);

  popup.querySelector(`.popup__close`).addEventListener(`click`, () => {
    removeCard();
  });

  // добавляем закрытие карточки по клику на Esc
  document.addEventListener(`keydown`, documentEscapePressHandler);

  return popup;
};

// Добавляем блок с удобствами
const createFeaturesBlock = (popup, announcement) => {
  if (announcement.offer.features.length === 0) {
    popup.querySelector(`.popup__features`).style.display = `none`;
  } else {
    const featuresList = popup.querySelector(`.popup__features`);
    featuresList.style.display = `block`;
    const features = announcement.offer.features;
    featuresList.innerHTML = ``;

    features.forEach((value) => {
      const copyFeaturesItem = document.createElement(`li`);

      copyFeaturesItem.classList.add(`popup__feature`);
      copyFeaturesItem.classList.add(`popup__feature--${value}`);
      featuresList.append(copyFeaturesItem);
    });
  }
};

//  Добавляем блок с фотографиями
const createPhotosBlock = (popup, announcement) => {
  if (announcement.offer.photos.length === 0) {
    popup.querySelector(`.popup__photos`).style.display = `none`;
  } else {
    const photosList = popup.querySelector(`.popup__photos`);
    photosList.style.display = `block`;
    const photos = announcement.offer.photos;
    photosList.innerHTML = ``;

    photos.forEach((item) => {
      const copyPhotosItem = document.createElement(`img`);

      copyPhotosItem.classList.add(`popup__photo`);
      copyPhotosItem.style.width = `45px`;
      copyPhotosItem.style.height = `40px`;
      copyPhotosItem.src = item;

      copyPhotosItem.addEventListener(`click`, () => {
        window.bigPicture.open(copyPhotosItem);
      });
      photosList.append(copyPhotosItem);
    });
  }
};

// добавляем закрытие карточки по клику на "крестик"
const removeCard = () => {
  const mapCardElement = window.map.element.querySelector(`.map__card`);
  if (mapCardElement) {
    window.map.removeActivePin();
    mapCardElement.remove();
    document.removeEventListener(`keydown`, documentEscapePressHandler);
  }
};

window.card = {
  create: createCard,
  remove: removeCard
};
