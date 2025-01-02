import {pictures} from './createThumbnail.js';
import {openPicture} from './openBigPhotoShow.js';

pictures.addEventListener('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');
  if (currentPicture) {
    openPicture(currentPicture.dataset.pictureId);
  }
});
