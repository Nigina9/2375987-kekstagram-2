import {
  photosMiniatures
} from './createThumbnail.js';
import {
  isEscapeKey
} from './util.js';

const pictureBig = document.querySelector('.big-picture');
const pictureBigImg = pictureBig.querySelector('.big-picture__img').querySelector('img');
const countLikes = pictureBig.querySelector('.likes-count');
const showLikes = pictureBig.querySelector('.social__comment-shown-count');
const totalLikes = pictureBig.querySelector('.social__comment-total-count');
const commentList = pictureBig.querySelector('.social__comments');
const commentItem = pictureBig.querySelector('.social__comment');
const caption = pictureBig.querySelector('.social__caption');
const pictureBigcloseButton = document.querySelector('#picture-cancel');
const body = document.body;

// Убедитесь, что модальное окно скрыто при загрузке
pictureBig.classList.add('hidden');

// / создаю функцию где добавляю класс хидден,
const hidePictureBig = () => {
  // Закрываем модальное окно
  pictureBig.classList.add('hidden');
  body.classList.remove('modal-open');

  // Очищаем комментарии
  commentList.innerHTML = '';

  // Сбрасываем данные изображения
  pictureBigImg.src = '';
  pictureBigImg.alt = '';
  countLikes.textContent = '';
  caption.textContent = '';

  // Сбрасываем состояние кнопки "Загрузить еще"
  const commentsLoaderButton = pictureBig.querySelector('.social__comments-loader');
  commentsLoaderButton.classList.remove('hidden');
};

// функция закрытия, которая вызывает функцию
const closePictureBig = () => {
  hidePictureBig();
};

// ставлю отработчик на кнопку крестик, чтоб при клике закрывалось
pictureBigcloseButton.addEventListener('click', () => {
  closePictureBig();
});

// делаю функцию чтоб заполнять данные о конкретной фотографии:
const openPicture = (pictureId) => {
  const photoCurrent = photosMiniatures.find((photo) => photo.id === Number(pictureId));
  const commentsFragment = document.createDocumentFragment();

  pictureBigImg.src = photoCurrent.url;
  countLikes.textContent = photoCurrent.likes;

  // Очищаем предыдущие комментарии
  commentList.innerHTML = '';

  // Добавление новых комментариев
  photoCurrent.comments.forEach((comment, index) => {
    const commentSocial = commentItem.cloneNode(true); // Клонируем элемент шаблона
    commentSocial.querySelector('.social__picture').src = comment.avatar; // Устанавливаем аватар
    commentSocial.querySelector('.social__picture').alt = comment.name; // Устанавливаем alt
    commentSocial.querySelector('.social__text').textContent = comment.message; // Устанавливаем текст комментария

    // Устанавливаем уникальный атрибут, чтобы не было конфликтов
    commentSocial.setAttribute('data-comment-id', index);

    // Добавляем комментарий во фрагмент
    commentsFragment.appendChild(commentSocial);
  });

  // Вставляем все комментарии в список
  commentList.appendChild(commentsFragment);

  // Обновляем счетчики комментариев
  showLikes.textContent = photoCurrent.comments.length;
  totalLikes.textContent = photoCurrent.comments.length; // показывать общее количество комментариев
  caption.textContent = photoCurrent.description;

  // Показываем большую фотографию
  pictureBig.classList.remove('hidden');
  body.classList.add('modal-open');
};

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    closePictureBig();
  }
});

// Удалить обработчик после закрытия окна
const handleDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closePictureBig();
    document.removeEventListener('keydown', handleDocumentKeydown);
  }
};

document.addEventListener('keydown', handleDocumentKeydown);

export {
  openPicture
};
