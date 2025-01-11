const MAX_HASHTAG_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENTS_LENGTH = 140;

const uploadFormImg = document.querySelector('.img-upload__form');
const textDescription = document.querySelector('.text__description');
const textHashtag = document.querySelector('.text__hashtags');

const options = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
};

const errorMessage = {
  hashtag: 'Поле заполнено некорректно.',
  description: `длина комментария не может составлять больше ${MAX_COMMENTS_LENGTH} символов`
};

const isErrorDescription = (value) => {
  let isValid = true;

  if (value.length > MAX_COMMENTS_LENGTH) {
    isValid = false;
  }

  return isValid;
};

const isErrorHashtag = (value) => {
  value = value.replace(/\s+/g, ' ').trim().split(' ');
  let isValid = true;
  const validHachtag = /^#[А-яЁёA-z0-9]{1,19}$/i;

  if (value.length > MAX_HASHTAG_COUNT) {
    errorMessage.hashtag = `Может быть не более ${MAX_HASHTAG_COUNT} хэштегов.`;
    isValid = false;
    return isValid;
  }

  const setHashtag = new Set(value);
  if (setHashtag.size !== value.length) {
    errorMessage.hashtag = 'Один и тот же хэштег не может быть использован дважды.';
    isValid = false;
    return isValid;
  }

  value.forEach((currentHachtag) => {
    if (!validHachtag.test(currentHachtag)) {
      errorMessage.hashtag = 'Хэштег должен начинаться с "#" и может состоять только из букв и чисел.';
      isValid = false;
    }

    if (currentHachtag.length > MAX_HASHTAG_LENGTH) {
      errorMessage.hashtag = `Максимальная длина одного хэштега ${MAX_HASHTAG_LENGTH} символов, включая решётку.`;
      isValid = false;
    }
  });
  return isValid;
};

const getHashtagErrorMessage = () => errorMessage.hashtag;

const pristine = new Pristine(uploadFormImg, options, true);

const form = () => {

  pristine.addValidator(textDescription, isErrorDescription, errorMessage.description);
  pristine.addValidator(textHashtag, isErrorHashtag, getHashtagErrorMessage);
};

const clearValidator = () => {
  pristine.reset();
  pristine.destroy();
};

export {
  form,
  clearValidator
};
