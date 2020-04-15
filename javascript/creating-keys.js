import LANGUAGES from './languages.js';

function createKeys(array, divTarget) {
  array.forEach((elem) => {
    const divRow = document.createElement('div');
    divRow.className = 'row';
    divTarget.append(divRow);

    elem.forEach((key) => {
      const divKey = document.createElement('div');

      divKey.className = 'key';
      divKey.setAttribute('id', key.id);

      if (key.class) {
        divKey.classList.add('func');
        divKey.classList.add(key.class);
      }

      divRow.append(divKey);
    });
  });
}

function addLetterToInput(input, letter) {
  input.setRangeText(letter, input.selectionStart, input.selectionEnd, 'end');
  input.focus();
}

function switchKeys(lang, keys, shift, caps) {
  const newKeys = keys.querySelectorAll('.key');
  const keyboard = document.querySelector('.virtual-keyboard');
  let mode = 'LOW';

  if (keyboard) {
    keys.remove();
  }

  if (caps) {
    mode = 'UPPER';
  }
  if (shift) {
    mode = 'SHIFT';
  }

  const currentKeysCollection = LANGUAGES[lang][mode];

  for (let i = 0; i < currentKeysCollection.length; (i += 1)) {
    newKeys[i].innerHTML = currentKeysCollection[i];
  }

  if (keyboard) {
    keyboard.append(keys);
  }
}

export {
  createKeys, addLetterToInput, switchKeys,
};
