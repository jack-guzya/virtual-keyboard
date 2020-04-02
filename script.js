import idKeys from './keys.js';
import createKeys from './creating-keys.js';
import { rusLow, rusUpper, rusShift } from './languages.js';

if (sessionStorage.getItem('language') === null && sessionStorage.getItem('caps') === null) {
  sessionStorage.setItem('language', 'ru');
  sessionStorage.setItem('caps', false);
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

function capsSwitch(libLow, libUpper, keys, caps) {
  const upperKeys = keys;
  for (let i = 0; i < libLow.length; (i += 1)) {
    switch (caps) {
      case true:
        upperKeys[i].innerHTML = libUpper[i];
        break;
      default:
        upperKeys[i].innerHTML = libLow[i];
    }
  }
}

function shiftSwitch(lib, libShift, keys, position) {
  const upperKeys = keys;
  for (let i = 0; i < lib.length; (i += 1)) {
    switch (position) {
      case true:
        upperKeys[i].innerHTML = libShift[i];
        break;
      default:
        upperKeys[i].innerHTML = lib[i];
    }
  }
}


// create basic structure

const virtualKeyboard = document.createElement('div');
const textArea = document.createElement('textarea');
const keysArea = document.createElement('div');

virtualKeyboard.className = 'virtual-keyboard';
keysArea.className = 'keys-area';

document.body.append(virtualKeyboard);
virtualKeyboard.append(textArea);
virtualKeyboard.append(keysArea);

createKeys(idKeys, keysArea);


const keysAll = keysArea.querySelectorAll('.key');
const keys = keysArea.querySelectorAll('div[class=key]');
const keysFunc = keysArea.querySelectorAll('.func');

addLetter(rusLow, keysAll);

// Add event to keys

let caps;

document.addEventListener('keydown', (event) => { // add class 'active' to keydown

  keys.forEach((key) => {
    if (key.getAttribute('id') === event.code) {
      event.preventDefault();
      key.classList.add('active');
      addLetterToInput(textArea, key.innerHTML);
    }
  });

  keysFunc.forEach((keyF) => {
    if (keyF.getAttribute('id') === event.code) {
      keyF.classList.add('active');
      event.preventDefault();

      switch (event.code) {
        case 'Tab':
          addLetterToInput(textArea, '   ');
          break;

        case 'Space':
          addLetterToInput(textArea, ' ');
          break;

        case 'CapsLock':
          sessionStorage.setItem('caps', !sessionStorage.getItem('caps'));

          if (sessionStorage.getItem('caps') === true) {
            capsSwitch(rusLow, rusUpper, keysAll, caps);
          }
          capsSwitch(rusLow, rusUpper, keysAll, caps);
          if (!caps) {
            capsSwitch(rusLow, rusUpper, keysAll, caps);
            keyF.classList.remove('active');
            break;
          } else break;

        case 'ShiftLeft':
        case 'ShiftRight':
          if (caps) shiftSwitch(rusUpper, rusShift, keysAll, true);
          else shiftSwitch(rusLow, rusShift, keysAll, true);
          break;

        case 'ArrowUp':
          addLetterToInput(textArea, '↑');
          break;

        case 'ArrowLeft':
          textArea.selectionStart -= 1;
          textArea.selectionEnd -= 1;
          textArea.focus();
          break;

        case 'ArrowDown':
          addLetterToInput(textArea, '↓');
          break;

        case 'ArrowRight':
          textArea.selectionStart += 1;
          break;

        case 'Backspace':
          textArea.setRangeText('', textArea.selectionStart -= 1, textArea.selectionEnd, 'end');
          break;

        case 'Delete':
          textArea.setRangeText('', textArea.selectionStart, textArea.selectionEnd += 1, 'end');
          break;

        case 'Enter':
          addLetterToInput(textArea, '\n');
          break;
        default:
      }
    }
  });

  if (event.shiftKey && event.altKey) {
    if (sessionStorage.getItem('language') === 'ru') {
      sessionStorage.setItem('language', 'en');
    } else sessionStorage.setItem('language', 'ru');
  }
});

document.addEventListener('keyup', (event) => { // remove class 'active' to keydown
  keys.forEach((key) => {
    if (key.getAttribute('id') === event.code) {
      key.classList.remove('active');
    }
  });

  keysFunc.forEach((keyF) => {
    if (keyF.getAttribute('id') === event.code) {
      switch (event.code) {
        case 'CapsLock':
          if (!caps) {
            keyF.classList.remove('active');
            break;
          } else break;
        case 'ShiftLeft':
        case 'ShiftRight':
          keyF.classList.remove('active');
          if (!caps) shiftSwitch(rusLow, rusShift, keysAll, false);
          else shiftSwitch(rusLow, rusShift, keysAll, false);
          break;
        default:
          keyF.classList.remove('active');
      }
    }
  });
});

// add events to virtual keys

keysArea.addEventListener('mousedown', (event) => {
  if (/^key$/.test(event.target.getAttribute('class'))) {
    addLetterToInput(textArea, event.target.innerHTML);
  } else {
    switch (event.target.getAttribute('id')) {
      case 'Tab':
        addLetterToInput(textArea, '   ');
        break;

      case 'ShiftLeft':
      case 'ShiftRight':
        shiftSwitch(rusUpper, rusShift, keysAll, true);
        event.target.addEventListener('mouseup', () => {
          if (caps === true) shiftSwitch(rusUpper, rusShift, keysAll, false);
          else shiftSwitch(rusLow, rusShift, keysAll, false);
        });
        break;

      case 'CapsLock':
        caps = !caps;
        capsSwitch(rusLow, rusUpper, keysAll, caps);
        if (caps === true) {
          capsSwitch(rusLow, rusUpper, keysAll, caps);
          event.target.classList.add('active');
          break;
        } else {
          event.target.classList.remove('active');
          break;
        }

      case 'Space':
        addLetterToInput(textArea, ' ');
        break;

      case 'ArrowUp':
        addLetterToInput(textArea, '↑');
        break;

      case 'ArrowLeft':
        textArea.selectionStart -= 1;
        textArea.selectionEnd -= 1;
        break;

      case 'ArrowDown':
        addLetterToInput(textArea, '↓');
        break;

      case 'ArrowRight':
        textArea.selectionStart += 1;
        break;

      case 'Backspace':
        textArea.setRangeText('', textArea.selectionStart -= 1, textArea.selectionEnd, 'end');
        break;

      case 'Delete':
        textArea.setRangeText('', textArea.selectionStart, textArea.selectionEnd += 1, 'end');
        break;

      case 'Enter':
        addLetterToInput(textArea, '\n');
        break;
      default:
    }
  }
});

keysArea.addEventListener('mouseup', () => {
  textArea.focus();
});
