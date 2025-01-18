import {createNewProfile} from './createArray.js';
// Ищем шаблон
const POST_AMOUNT = 25;
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const documentFragment = document.createDocumentFragment();
const photos = createNewProfile(POST_AMOUNT);

photos.forEach((photo) => {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = photo.url;
  picture.querySelector('.picture__img').alt = photo.description;
  picture.querySelector('.picture__likes').textContent = photo.likes;
  picture.querySelector('.picture__comments').textContent = photo.comments.length;
  documentFragment.appendChild(picture);
});

pictures.appendChild(documentFragment);

export {photos};

