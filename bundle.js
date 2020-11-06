(()=>{"use strict";window.util={ESC_KEYCODE:27,ENTER_KEYCODE:13,isEscPress:function(e){return e.keyCode===window.util.ESC_KEYCODE},isEnterPress:function(e){return e.keyCode===window.util.ENTER_KEYCODE},disableElements:function(e){e.forEach((function(e){e.disabled=!0}))},enableElements:function(e){e.forEach((function(e){e.disabled=!1}))}},(()=>{const e=(e,t,n,o,r)=>{let i=new XMLHttpRequest;i.responseType="json",i.timeout=3e3,i.open(t,e),i.addEventListener("load",(function(){switch(i.status){case 200:o(i.response);break;case 400:r("Неправильный запрос.  Код ошибки "+i.status);break;case 404:r("Страница не найдена. Код ошибки "+i.status);break;case 500:r("Внутренняя ошибка сервера. Код ошибки "+i.status);break;default:r("При загрузке произошла ошибка "+i.status+". Повторите попытку позже.")}})),i.addEventListener("error",(function(){r("Произошла ошибка соединения")})),i.addEventListener("timeout",(function(){r("Запрос не успел выполниться за "+i.timeout+"мс")})),i.send(n)};window.backend={save:function(t,n,o){e("https://21.javascript.pages.academy/keksobooking","POST",t,n,o)},load:function(t,n){e("https://21.javascript.pages.academy/keksobooking/data","GET",null,t,n)}}})(),(()=>{const e=document.querySelector("#avatar"),t=document.querySelector(".ad-form-header__preview img"),n=document.querySelector("#images"),o=document.querySelector(".ad-form__photo"),r=["gif","jpg","jpeg","png"],i="img/muffin-grey.svg";o.style.display="flex",o.insertAdjacentHTML("afterbegin",'<img src="img/muffin-grey.svg" alt="Фотография жилья" width="50" height="50" style="margin: 10px;">');const s=o.firstChild,l=(e,t)=>{e.addEventListener("change",(function(){const n=e.files[0],o=n.name.toLowerCase();if(r.some((function(e){return o.endsWith(e)}))){var i=new FileReader;i.addEventListener("load",(function(){t.src=i.result})),i.readAsDataURL(n)}}))};l(e,t),l(n,s),window.chooserImage={remove:()=>{t.src=i,s.src=i}}})(),(()=>{const e=document.querySelector(".ad-form"),t=e.querySelectorAll(".ad-form__element"),n=e.querySelector("#address"),o=e.querySelector(".ad-form__reset"),r=e.querySelector("#room_number"),i=e.querySelector("#capacity");e.querySelector(".ad-form__submit").addEventListener("click",(()=>{const e=r.value,t=i.value;"100"===e&&"0"!==t?r.setCustomValidity("100 комнат — не для гостей"):"1"===e&&"1"!==t?r.setCustomValidity("1 комната — для 1 гостя"):"2"!==e||"1"===t&&"2"===t?"3"===e&&"0"===t?r.setCustomValidity("3 комнаты — для 1 или 2 или 3 гостей"):r.setCustomValidity(""):r.setCustomValidity("2 комнаты — для 1 или 2 гостей")}));const s=e.querySelector("#title");s.addEventListener("input",(()=>{const e=s.value.length;e<30?s.setCustomValidity(`Минимальная длина заголовка - 30 символов. Наберите еще ${30-e} символов`):e>100?s.setCustomValidity(`Максимальная длина заголовка - 100 символов. Удалите ${e-30} символов`):s.setCustomValidity("")}));const l=e.querySelector("#type"),d=e.querySelector("#price");l.addEventListener("change",(()=>{switch(l.value){case"bungalow":d.min="0",d.placeholder="0";break;case"flat":d.min="1000",d.placeholder="1 000";break;case"house":d.min="5000",d.placeholder="5 000";break;case"palace":d.min="10000",d.placeholder="10 000"}}));const a=e.querySelector(".ad-form__element--time"),c=e.querySelector("#timein"),u=e.querySelector("#timeout");a.addEventListener("change",(e=>{c.value=e.target.value,u.value=e.target.value})),window.form={element:e,resetElement:o,disable:()=>{e.classList.add("ad-form--disabled"),e.reset(),window.chooserImage.remove(),window.util.disableElements(t)},enable:()=>{e.classList.remove("ad-form--disabled"),window.util.enableElements(t)},setAddressPin:e=>{n.value=`${e.x}, ${e.y}`}}})(),(()=>{const e=document.querySelector("#card").content.querySelector(".map__card"),t={flat:"Квартира",bungalow:"Бунгало",house:"Дом",palace:"Дворец"},n=e.cloneNode(!0);n.querySelector(".popup__close").addEventListener("click",(function(){n.remove(),window.map.removeActivePin()})),document.addEventListener("keydown",(function(e){window.util.isEscPress(e)&&(n.remove(),window.map.removeActivePin())})),window.card={create:function(e){return n.querySelector(".popup__title").textContent=e.offer.title,n.querySelector(".popup__text--address").textContent=e.offer.address,n.querySelector(".popup__text--price").textContent=e.offer.price+"₽/ночь",n.querySelector(".popup__type").textContent=t[e.offer.type],n.querySelector(".popup__text--capacity").textContent=`${e.offer.rooms} комнаты для ${e.offer.guests} гостей`,n.querySelector(".popup__text--time").textContent=`Заезд после ${e.offer.checkin}, выезд до ${e.offer.checkout}`,n.querySelector(".popup__description").textContent=e.offer.description,n.querySelector(".popup__avatar").src=e.author.avatar,(e=>{if(0===e.offer.features.length)n.querySelector(".popup__features").style.display="none";else{const t=n.querySelector(".popup__features");t.style.display="block";const o=e.offer.features;t.innerHTML="",o.forEach((function(e){const n=document.createElement("li");n.classList.add("popup__feature"),n.classList.add("popup__feature--"+e),t.append(n)}))}})(e),(e=>{if(0===e.offer.photos.length)n.querySelector(".popup__photos").style.display="none";else{const t=n.querySelector(".popup__photos");t.style.display="block";const o=e.offer.photos;t.innerHTML="",o.forEach((function(e){const n=document.createElement("img");n.classList.add("popup__photo"),n.style.width="45px",n.style.height="40px",n.src=e,n.addEventListener("click",(function(){window.bigPicture.open(n)})),t.append(n)}))}})(e),n},remove:()=>{const e=window.map.element.querySelector(".map__card");e&&e.remove()}}})(),(()=>{let e,t;const n=()=>{e.remove(),t.remove(),e.removeEventListener("click",n),t.removeEventListener("click",n)};window.addEventListener("keydown",(function(e){window.util.isEscPress(e)&&n()}));window.bigPicture={open:o=>{const r=document.createElement("img");r.src=o.src,r.style.width="auto",r.style.height="auto",r.style.border="10px solid #ffffff",e=(()=>{let e=document.createElement("div");return e.style.position="fixed",e.style.backgroundColor="rgba(0,0,0,0.8)",e.style.left=0,e.style.top=0,e.style.right=0,e.style.bottom=0,e.style.zIndex=99,e.style.display="flex",e.style.alignItems="center",e.style.justifyContent="center",e})(),t=(()=>{let e=document.createElement("button");return e.style.position="fixed",e.style.backgroundColor="transparent",e.style.right=0,e.style.top=0,e.style.width="55px",e.style.height="65px",e.style.display="block",e.style.border="1px solid transparent",e.style.fontSize="50px",e.textContent="×",e.style.color="#ffffff",e.style.padding="0",e.style.cursor="pointer",e.style.zIndex=100,e})(),document.body.appendChild(e),document.body.appendChild(t),r.addEventListener("load",(function(){e.appendChild(r)})),e.addEventListener("click",(function(e){e.target!==r&&n()})),t.addEventListener("click",n)}}})(),(()=>{const e=document.querySelector("#pin").content.querySelector(".map__pin");window.pin={templatePin:e,render:t=>{let n=e.cloneNode(!0),o=n.querySelector("img");return n.style.top=t.location.y-44-5+"px",n.style.left=t.location.x-20+"px",o.src=t.author.avatar,o.alt=t.offer.title,n.addEventListener("click",(function(){let e=document.querySelector(".map__pin--active");e&&e.classList.remove("map__pin--active"),n.classList.add("map__pin--active")})),n}}})(),window.debounce=function(e){var t=null;return function(...n){t&&window.clearTimeout(t),t=window.setTimeout((function(){e(...n)}),300)}},(()=>{const e=document.querySelector(".map__filters"),t=e.querySelector("#housing-type"),n=e.querySelector("#housing-price"),o=e.querySelector("#housing-rooms"),r=e.querySelector("#housing-guests"),i="any",s=s=>s.filter((function(s){return(e=>t.value===i||e.offer.type===t.value)(s)&&(e=>n.value===i||e.offer.price<1e4&&"low"===n.value||e.offer.price>5e4&&"high"===n.value||e.offer.price>=1e4&&e.offer.price<=5e4&&"middle"===n.value)(s)&&(e=>o.value===i||e.offer.rooms===parseInt(o.value,10))(s)&&(e=>r.value===i||e.offer.guests===parseInt(r.value,10))(s)&&(l=s.offer.features,Array.from(e.querySelectorAll('input[type="checkbox"]:checked')).every((e=>l.includes(e.value))));var l})).slice(0,5);window.filters={setFilteredPins:(t,n)=>{let o=window.debounce((function(){n(s(t))}));e.addEventListener("change",(function(){o()})),n(s(t))},clear:()=>{e.reset()}}})(),(()=>{const e=document.querySelector(".map"),t=document.querySelector(".map__pins"),n=e.querySelector(".map__filters-container"),o=document.querySelector(".map__filters"),r=o.querySelectorAll(".map__filter"),i=o.querySelector(".map__features"),s=()=>{window.util.enableElements(r)};window.map={element:e,mapFiltersForm:o,disable:()=>{e.classList.add("map--faded"),window.card.remove(),window.map.removePins(),o.classList.add("ad-form--disabled"),window.util.disableElements(r),i.disabled=!0,window.mainPin.reset()},enable:()=>{e.classList.remove("map--faded"),o.classList.remove("ad-form--disabled"),s(),i.disabled=!1},addPins:o=>{t.appendChild((t=>{let o,r=document.createDocumentFragment();for(let i=0;i<t.length;i++)o=window.pin.render(t[i]),o.addEventListener("click",(function(){var o;o=window.card.create(t[i]),window.card.remove(),e.insertBefore(o,n)})),r.appendChild(o);return r})(o))},removePins:()=>{t.querySelectorAll(".map__pin:not(.map__pin--main)").forEach((e=>{t.removeChild(e)}))},removeActivePin:function(){let e=document.querySelector(".map__pin--active");e&&e.classList.remove("map__pin--active")}}})(),(()=>{const e=document.querySelector(".map__pin--main"),t=window.map.element.offsetWidth-32.5,n=e.style.left,o=e.style.top,r=()=>{const t=e.offsetLeft,n=e.offsetTop;let o={};return o=window.map.element.classList.contains("map--faded")?{x:Math.round(t+32.5),y:Math.round(n+32.5)}:{x:Math.round(t+32.5),y:Math.round(n+85)},o};e.addEventListener("mousedown",(n=>{n.preventDefault();let o={x:n.clientX,y:n.clientY};const i=n=>{n.preventDefault();let i=o.x-n.clientX,s=o.y-n.clientY;o={x:n.clientX,y:n.clientY};let l=e.offsetLeft-i,d=e.offsetTop-s;l>=-32.5&&l<=t&&(e.style.left=e.offsetLeft-i+"px"),d>=45&&d<=545&&(e.style.top=e.offsetTop-s+"px"),window.form.setAddressPin(r())},s=e=>{e.preventDefault(),document.removeEventListener("mousemove",i),document.removeEventListener("mouseup",s)};document.addEventListener("mousemove",i),document.addEventListener("mouseup",s)})),window.mainPin={element:e,getAddressPin:r,reset:()=>{e.style.left=n,e.style.top=o}}})(),(()=>{const e=document.querySelector("#success").content.querySelector(".success"),t=document.querySelector("#error").content.querySelector(".error"),n=e.cloneNode(!0);document.addEventListener("keydown",(function(e){window.util.isEscPress(e)&&n.remove()})),document.addEventListener("click",(function(e){e.target===n&&n.remove()}));const o=t.cloneNode(!0);o.querySelector(".error__button").addEventListener("click",(function(){o.remove()})),document.addEventListener("keydown",(function(e){window.util.isEscPress(e)&&o.remove()})),document.addEventListener("click",(function(e){e.target===o&&o.remove()})),window.message={showSuccess:()=>{document.querySelector("main").appendChild(n)},showError:e=>{o.style="text-align: center",o.style.display="block",o.style.position="fixed",o.style.zIndex="100",o.style.width="100%",o.style.backgroundColor="rgba(255, 86, 53, 0.8)",o.style.color="#fff",o.style.fontSize="25px",o.style.fontWeight="bold",o.style.lineHeight="65px",o.style.textAlign="center",o.querySelector(".error__message").textContent=e,document.querySelector("main").appendChild(o)}}})(),(()=>{const e=()=>{window.filters.clear(),window.map.disable(),window.form.disable(),window.form.setAddressPin(window.mainPin.getAddressPin())};e();const t=()=>{window.map.enable(),window.form.enable(),window.form.setAddressPin(window.mainPin.getAddressPin()),window.backend.load((function(e){let t=e.filter((function(e){return"offer"in e}));window.filters.setFilteredPins(t,n)}),r)},n=e=>{window.map.removePins(),window.card.remove(),window.map.addPins(e)};window.form.element.addEventListener("submit",(function(e){e.preventDefault(),window.form.element.checkValidity()&&window.backend.save(new FormData(window.form.element),o,r)})),window.form.resetElement.addEventListener("click",(function(){e()}));const o=()=>{window.message.showSuccess(),e()},r=()=>{window.message.showError()};window.mainPin.element.addEventListener("mousedown",(e=>{0===e.button&&t()})),window.mainPin.element.addEventListener("keydown",(e=>{window.util.isEnterPress(e)&&t()}))})()})();