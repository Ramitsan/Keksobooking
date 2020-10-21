'use strict';

(function() {
  const card = document.querySelector('#card').content.querySelector('.map__card');
  const typesOfHousing = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  const popup = card.cloneNode(true);

  function createCard(announcement) {
    popup.querySelector('.popup__title').textContent = announcement.offer.title;
    popup.querySelector('.popup__text--address').textContent = announcement.offer.address;
    popup.querySelector('.popup__text--price').textContent = `${announcement.offer.price}₽/ночь`;
    popup.querySelector('.popup__type').textContent = typesOfHousing[announcement.offer.type];
    popup.querySelector('.popup__text--capacity').textContent = `${announcement.offer.rooms} комнаты для ${announcement.offer.guests} гостей`;
    popup.querySelector('.popup__text--time').textContent = `Заезд после ${announcement.offer.checkin}, выезд до ${announcement.offer.checkout}`;
    popup.querySelector('.popup__description').textContent = announcement.offer.description;
    popup.querySelector('.popup__avatar').src = announcement.author.avatar;

    createFeaturesBlock(announcement);
    createPhotosBlock(announcement);

    return popup;
  }

  // Добавляем блок с удобствами
  const createFeaturesBlock = (announcement) => {
    if (announcement.offer.features.length === 0) {
      popup.querySelector(`.popup__features`).style.display = "none";
    } else {
      const featuresList = popup.querySelector('.popup__features');
      const features = announcement.offer.features;
      featuresList.innerHTML = '';

      features.forEach(function(value) {
        const copyFeaturesItem = document.createElement('li');

        copyFeaturesItem.classList.add(`popup__feature`);
        copyFeaturesItem.classList.add(`popup__feature--${value}`);
        featuresList.append(copyFeaturesItem);
      });
    }
  }

  //  Добавляем блок с фотографиями
  const createPhotosBlock = (announcement) => {
    if (announcement.offer.photos.length === 0) {
      popup.querySelector(`.popup__photos`).style.display = "none";
    } else {
      const photosList = popup.querySelector('.popup__photos');
      const photos = announcement.offer.photos;
      photosList.innerHTML = '';

      photos.forEach(function(item) {
        const copyPhotosItem = document.createElement('img');

        copyPhotosItem.classList.add('popup__photo');
        copyPhotosItem.style.width = '45px';
        copyPhotosItem.style.height = '40px';
        copyPhotosItem.src = item;
        photosList.append(copyPhotosItem);
      });
    }
  }

  window.card = {
    createCard: createCard
  };

})();
