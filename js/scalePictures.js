const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlValue = document.querySelector('.scale__control--value');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const bigImages = document.querySelector('.img-upload__preview img');

const MAX_CONTROL = 100;
const MIN_CONTROL = 25;
const DEFAULT_CONTROL = 100;
const STEP = 25;

const upValue = () => Math.min(MAX_CONTROL, (parseInt(scaleControlValue.value, 10) + STEP));
const endValue = () => Math.max(MIN_CONTROL, (parseInt(scaleControlValue.value, 10) - STEP));
const updateScale = (value) => {
  scaleControlValue.value = `${value}%`;
  bigImages.style.transform = `scale(${value / 100})`;
};

const pictureScale = () => {
  scaleControlSmaller.addEventListener('click', () => {
    updateScale(endValue());
  });

  scaleControlBigger.addEventListener('click', () => {
    updateScale(upValue());
  });
};

const pictureScaleDefault = () => updateScale(DEFAULT_CONTROL);

export {
  pictureScale,
  pictureScaleDefault
};
