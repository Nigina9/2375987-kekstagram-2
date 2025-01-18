
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

const commentCountElement = document.querySelector('.social__comment-count');
const commentsLoaderElement = document.querySelector('.comments-loader');

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
  commentsLoaderElement.classList.remove('hidden');
};

// функция закрытия, которая вызывает функцию
const closePictureBig = () => {
  hidePictureBig();
};

// ставлю отработчик на кнопку крестик, чтоб при клике закрывалось
pictureBigcloseButton.addEventListener('click', () => {
  closePictureBig();
});

// Функция для отображения комментариев порциями по 5
const openPicture = (pictureId) => {
  const photoCurrent = photosMiniatures.find((photo) => photo.id === Number(pictureId));
  let commentIndex = 0; // Начальный индекс для комментариев

  pictureBigImg.src = photoCurrent.url;
  countLikes.textContent = photoCurrent.likes;

  // Очищаем предыдущие комментарии
  commentList.innerHTML = '';

  // Обработчик клика по кнопке "Загрузить ещё"
  const loadMoreComments = () => {
    const commentsFragment = document.createDocumentFragment();
    const commentsToShow = photoCurrent.comments.slice(commentIndex, commentIndex + 5);

    // Добавление новых комментариев
    commentsToShow.forEach((comment, index) => {
      const commentSocial = commentItem.cloneNode(true); // Клонируем элемент шаблона
      commentSocial.querySelector('.social__picture').src = comment.avatar; // Устанавливаем аватар
      commentSocial.querySelector('.social__picture').alt = comment.name; // Устанавливаем alt
      commentSocial.querySelector('.social__text').textContent = comment.message; // Устанавливаем текст комментария

      // Добавляем комментарий в фрагмент
      commentsFragment.appendChild(commentSocial);
    });

    // Вставляем все комментарии в список
    commentList.appendChild(commentsFragment);

    // Обновляем счётчик отображённых комментариев
    commentIndex += 5;
    showLikes.textContent = commentIndex;

    // Если все комментарии показаны, скрываем кнопку "Загрузить ещё"
    if (commentIndex >= photoCurrent.comments.length) {
      commentsLoaderElement.classList.add('hidden');
    }
  };

  // Загружаем первые 5 комментариев
  loadMoreComments();

  // Добавляем обработчик для кнопки загрузки дополнительных комментариев
  commentsLoaderElement.addEventListener('click', () => {
    loadMoreComments();
  });

  // Обновляем общий счётчик комментариев
  totalLikes.textContent = photoCurrent.comments.length;
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

if (commentCountElement) {
  commentCountElement.classList.remove('hidden');
}

if (commentsLoaderElement) {
  commentsLoaderElement.classList.remove('hidden');
}


export {
  openPicture
};
