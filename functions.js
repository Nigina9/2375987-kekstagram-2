// const checkString = function (myString, myLength) {
//   if (myString.length <= myLength) {
//     return true;
//   } else {
//     return false;
//   }
// };
// checkString('Добрыйдень', 20);


// const checkPallindrome = function (stringNew) {
//   stringNew = stringNew.replaceAll(' ', '').toUpperCase();
//   let stringEmpty = ' ';
//   for (let i = stringNew - 1; i >= 0; i--) {
//     stringEmpty += stringNew.at(i);
//   }
//   return stringEmpty === stringEmpty;
// };

// checkPallindrome('Нигин');

/*
'8:00' - начало рабочего дня
'17:30' - конец рабочего дня
'14:00' - начало встречи
90 - продолжительность встречи в минутах
*/
// const beginningWork = '8:00';
// const endingWork = '17:30';
// const meetingBeginning = '14:00';
// const timeMeeting = 90;

// const checkWork = (beginning, ending, meeting, time) => {
//   if (beginning === '8:00' || beginning === '08:00' || beginning === '08:0' || beginning === '8:00') {
//     if (ending === '17:30' || ending === '17:3') {
//       if (meeting === '14:00' || meeting === '14:0') {
//         if (time === 90) {
//           return true;
//         }
//       }
//     }
//   } else {
//     return false;
//   }
// };

// console.log(checkWork('08:00', '17:30', '14:00', 90));
