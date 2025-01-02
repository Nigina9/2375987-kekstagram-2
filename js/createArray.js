import {
  descriptionProfile,
  messageProfile,
  nameProfile
} from './data.js';
import {
  randomInteger,
  getRandomInRange
} from './util.js';


const minComment = 0;
const maxComment = 30;
const minLikes = 15;
const maxLikes = 200;
const randomDescription = randomInteger(0, descriptionProfile.length - 1);
const randomMessage = randomInteger(0, messageProfile.length - 1);
const randomName = randomInteger(0, nameProfile.length - 1);

const createComents = () => {
  const comentsRandom = randomInteger(minComment, maxComment);
  const comments = [];
  for (let i = 0; i <= comentsRandom; i++) {
    comments.push({
      idComments: getRandomInRange(1, 80),
      avatar: `img/avatar-${getRandomInRange(1, 6)}.svg`,
      message: messageProfile[randomMessage],
      name: nameProfile[randomName],
    });
  }
  return comments;
};

const createProfile = () => ({
  id: getRandomInRange(1, 25),
  url: `photos/${getRandomInRange(1, 25)}.jpg`,
  description: descriptionProfile[randomDescription],
  likes: getRandomInRange(minLikes, maxLikes),
  comments: createComents()
});

const countNumber = 25;
const createNewProfile = () => Array.from({
  length: countNumber
}, createProfile);


export {
  createNewProfile
};
