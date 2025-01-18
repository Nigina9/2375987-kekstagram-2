import {
  styleEffects
} from './dataEffects.js';

let currentEffect = 'none';

const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevel = document.querySelector('.effect-level');

const setImageStyle = () => {
  if (currentEffect === 'none') {
    imgUploadPreview.style.filter = null;
    return;
  }

  const value = effectLevelValue.value;
  const unit = styleEffects[currentEffect].unit;
  const style = styleEffects[currentEffect].style;
  imgUploadPreview.style.filter = `${style}(${value}${unit})`;
};

const onSliderUpdate = () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  setImageStyle();
};

const createSlider = () => {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 1
    },
    step: 0.1,
    start: 1,
    connect: 'lower',
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value)
    }
  });

  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  effectLevelSlider.noUiSlider.on('update', onSliderUpdate);
};

const updateSlider = ({
  min,max,step
}) => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: {min,max
    },
    step,
    start: max
  });

  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
};

const pictureEffectReset = () => {
  effectLevel.classList.add('hidden');
  imgUploadPreview.style.filter = null;
  effectLevelSlider.value = null;
};

effectsList.addEventListener('change', (evt) => {
  currentEffect = evt.target.value;

  if (currentEffect === 'none') {
    pictureEffectReset();
    effectLevel.classList.add('hidden');
    effectLevelSlider.value = null;
  } else {
    effectLevel.classList.remove('hidden');
    effectLevelSlider.value = currentEffect;
    updateSlider(styleEffects[currentEffect]);
    setImageStyle();
  }
});

const pictureEffectInit = () => {
  createSlider(styleEffects[currentEffect]);
};

export {
  pictureEffectInit,
  pictureEffectReset
};
