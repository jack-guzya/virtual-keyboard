import {
  rusLow, rusUpper, rusShift, enLow, enUpper, enShift,
} from './languages.js';

function createKeys(array, divTarget) {
  array.forEach((elem) => {
    const divRow = document.createElement('div');
    divRow.className = 'row';
    divTarget.append(divRow);

    elem.forEach((key) => {
      const divKey = document.createElement('div'); // create key

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

function addLetterToInput(input, letter) {
  input.setRangeText(letter, input.selectionStart, input.selectionEnd, 'end');
  input.focus();
}

function addLetter(lib, keys) {
  for (let i = 0; i < lib.length; (i += 1)) {
    keys[i].insertAdjacentHTML('afterbegin', lib[i]);
  }
}

function capsSwitch(lang, keys, caps) {
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

function shiftSwitch(lang, keys, position, caps) {
  const upperKeys = keys;
  for (let i = 0; i < rusLow.length; (i += 1)) {
    switch (lang) {
      case 'ru':

        switch (position) {
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
        switch (position) {
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
