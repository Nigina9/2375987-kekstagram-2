
import {createNewProfile} from './createArray.js';
import { openPicture } from './openBigPhotoShow.js';
// Ищем шаблон
const POST_AMOUNT = 25;
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const documentFragment = document.createDocumentFragment();
const photosMiniatures = createNewProfile(POST_AMOUNT);

photosMiniatures.forEach(({ id, url, description, comments, likes }) => {
  const picture = pictureTemplate.cloneNode(true);
  picture.dataset.pictureId = id; // Присваиваем id миниатюры
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;

  // Добавляем обработчик события для открытия изображения
  picture.addEventListener('click', () => {
    openPicture(id);
  });

  documentFragment.appendChild(picture);
});

pictures.appendChild(documentFragment);

export { pictures, photosMiniatures };
