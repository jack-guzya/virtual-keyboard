import {
  rusLow, rusUpper, rusShift, enLow, enUpper, enShift,
} from './languages.js';

function createKeys(array, divTarget) { // creating blank keys
  array.forEach((elem) => { // creating rows
    const divRow = document.createElement('div');
    divRow.className = 'row';
    divTarget.append(divRow);

    elem.forEach((key) => {
      const divKey = document.createElement('div'); // creating keys

      divKey.className = 'key';
      divKey.setAttribute('id', key.id);

      if (key.class) {
        // add func class to key
        divKey.classList.add('func');
        divKey.classList.add(key.class);
      }

      divRow.append(divKey); // add key to row
    });
  });
}

function addLetterToInput(input, letter) { // adding letters to textarea
  input.setRangeText(letter, input.selectionStart, input.selectionEnd, 'end');
  input.focus();
}

function addLetter(lang, keys, caps) { // adding letters to keys when switch language
  const newKeys = keys;

  for (let i = 0; i < rusLow.length; (i += 1)) {
    if (lang === 'ru') {
      if (caps === true) {
        newKeys[i].innerHTML = rusUpper[i];
      } else newKeys[i].innerHTML = rusLow[i];
    } else if (caps === true) {
      newKeys[i].innerHTML = enUpper[i];
    } else newKeys[i].innerHTML = enLow[i];
  }
}

function capsSwitch(lang, keys, caps) { // switch letters when press caps_lock
  const upperKeys = keys;
  for (let i = 0; i < rusLow.length; (i += 1)) {
    switch (lang) {
      case 'ru':

        switch (caps) {
          case true:
            upperKeys[i].innerHTML = rusUpper[i];
            break;
          default:
            upperKeys[i].innerHTML = rusLow[i];
        }
        break;

      default:
        switch (caps) {
          case true:
            upperKeys[i].innerHTML = enUpper[i];
            break;

          default:
            upperKeys[i].innerHTML = enLow[i];
        }
    }
  }
}

function shiftSwitch(lang, keys, shiftActive, caps) { // switch letters when press shift
  const upperKeys = keys;
  for (let i = 0; i < rusLow.length; (i += 1)) {
    switch (lang) {
      case 'ru':

        switch (shiftActive) {
          case true:
            upperKeys[i].innerHTML = rusShift[i];
            break;

          default:
            if (caps === true) {
              upperKeys[i].innerHTML = rusUpper[i];
            } else upperKeys[i].innerHTML = rusLow[i];
        }
        break;

      default:
        switch (shiftActive) {
          case true:
            upperKeys[i].innerHTML = enShift[i];
            break;

          default:
            if (caps === true) {
              upperKeys[i].innerHTML = enUpper[i];
            } else upperKeys[i].innerHTML = enLow[i];
        }
    }
  }
}

export {
  createKeys, addLetterToInput, addLetter, capsSwitch, shiftSwitch,
};
