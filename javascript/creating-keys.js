import LANGUAGES from './languages.js';

function createKeys(array, divTarget) {
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

function addLetterToInput(input, letter) {
  input.setRangeText(letter, input.selectionStart, input.selectionEnd, 'end');
  input.focus();
}

function switchKeys(lang, keys, shift, caps) {
  const newKeys = keys;
  let mode = 'LOW';

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
}

export {
  createKeys, addLetterToInput, switchKeys,
};
