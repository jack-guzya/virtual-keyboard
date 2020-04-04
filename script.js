import idKeys from './keys.js';
import {
  createKeys, addLetterToInput, addLetter, capsSwitch, shiftSwitch,
} from './creating-keys.js';

// create session storage

if (sessionStorage.getItem('lang') === null) {
  sessionStorage.setItem('lang', 'ru');
}

let caps = false;

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

addLetter(sessionStorage.lang, keysAll, caps);

// create info blocks

const callInfo = document.createElement('div');
const callInfoDescription = document.createElement('p');

keysAll[60].classList.add('pulse'); // add pulse effect to ctrl right when call-info is active

callInfo.className = 'call-info';
callInfoDescription.className = 'call-info__description';

const info = document.createElement('div');
const osInfo = document.createElement('p');
const langSwitchInfo = document.createElement('p');

info.className = 'info';
info.classList.add('hide');
osInfo.className = 'info__os';
langSwitchInfo.className = 'info__lang-switch';

const langInfo = document.createElement('div');
langInfo.className = 'lang-info';
langInfo.classList.add('hide');

document.body.append(langInfo);

virtualKeyboard.append(callInfo);
callInfo.append(callInfoDescription);


virtualKeyboard.append(info);
info.append(osInfo);
info.append(langSwitchInfo);

osInfo.innerHTML = 'Клавиатура разработана под управлением операционной системы Windows';
langSwitchInfo.innerHTML = 'Для переключения языка нажмите Alt+Shift на физической или Alt Left на виртуальной клавиатуре';

callInfoDescription.innerHTML = 'Для вызова справки нажмите Ctrl Right';

langInfo.innerHTML = sessionStorage.getItem('lang'); // change showing language info block after restart page


callInfo.addEventListener('animationend', () => {
  callInfo.classList.add('hide');
  keysAll[60].classList.remove('pulse'); // remove pulse effect
});

info.addEventListener('animationend', () => {
  info.classList.add('hide');
  keysAll[57].classList.remove('pulse'); // remove pulse effect
  keysAll[42].classList.remove('pulse');
});

// create lang switch function

function langSwitch() {
  if (sessionStorage.getItem('lang') === 'ru') {
    sessionStorage.setItem('lang', 'en');
    addLetter(sessionStorage.lang, keysAll, caps);
    langInfo.innerHTML = sessionStorage.getItem('lang');
    langInfo.classList.remove('hide');
  } else {
    sessionStorage.setItem('lang', 'ru');
    addLetter(sessionStorage.lang, keysAll, caps);
    langInfo.innerHTML = sessionStorage.getItem('lang');
    langInfo.classList.remove('hide');
  }
}

langInfo.addEventListener('animationend', () => {
  langInfo.classList.add('hide');
});

// Add event to keys

document.addEventListener('keydown', (event) => {
  keys.forEach((key) => { // add action to keys
    if (key.getAttribute('id') === event.code) {
      event.preventDefault();

      key.classList.add('active');
      addLetterToInput(textArea, key.innerHTML);
    }
  });

  keysFunc.forEach((keyF) => { // add action to function keys
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
          caps = !caps;
          capsSwitch(sessionStorage.lang, keysAll, caps);
          if (caps === false) {
            keyF.classList.remove('active');
          }
          break;

        case 'ShiftLeft':
        case 'ShiftRight':
          shiftSwitch(sessionStorage.lang, keysAll, true, caps);
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
          if (textArea.selectionStart === 0) {
            break;
          } else textArea.setRangeText('', textArea.selectionStart -= 1, textArea.selectionEnd, 'end');
          break;

        case 'Delete':
          textArea.setRangeText('', textArea.selectionStart, textArea.selectionEnd += 1, 'end');
          break;

        case 'Enter':
          addLetterToInput(textArea, '\n');
          break;

        case 'ControlRight':
          if (callInfo.getAttribute('class') === 'call-info') {
            break;
          } else {
            info.classList.remove('hide');
            keysAll[57].classList.add('pulse'); // add pulse effect
            keysAll[42].classList.add('pulse'); // add pulse effect to Shift
          }
          break;

        default:
      }
    }
  });

  info.addEventListener('animationend', () => {
    info.classList.add('hide');
  });

  if (event.shiftKey && event.altKey) { // switch language
    langSwitch();
  }
});

document.addEventListener('keyup', (event) => {
  keys.forEach((key) => { // add action to keys when committed keyup event
    if (key.getAttribute('id') === event.code) {
      key.classList.remove('active');
    }
  });

  keysFunc.forEach((keyF) => { // add action to function keys when committed keyup event
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
          shiftSwitch(sessionStorage.lang, keysAll, false, caps);
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
    addLetterToInput(textArea, event.target.innerHTML); // add events to virtual keys
  } else { // add events to virtual  function keys
    switch (event.target.getAttribute('id')) {
      case 'Tab':
        addLetterToInput(textArea, '   ');
        break;

      case 'ShiftLeft':
      case 'ShiftRight':
        shiftSwitch(sessionStorage.lang, keysAll, true, caps);
        event.target.addEventListener('mouseup', () => {
          shiftSwitch(sessionStorage.lang, keysAll, false, caps);
        });
        break;

      case 'CapsLock':
        caps = !caps;
        event.target.classList.add('active');
        capsSwitch(sessionStorage.lang, keysAll, caps);
        if (caps === false) {
          event.target.classList.remove('active');
        }
        break;

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
        if (textArea.selectionStart === 0) {
          break;
        } else textArea.setRangeText('', textArea.selectionStart -= 1, textArea.selectionEnd, 'end');
        break;

      case 'Delete':
        textArea.setRangeText('', textArea.selectionStart, textArea.selectionEnd += 1, 'end');
        break;

      case 'Enter':
        addLetterToInput(textArea, '\n');
        break;

      case 'ControlRight':
        if (callInfo.getAttribute('class') === 'call-info') {
          break;
        } else {
          info.classList.remove('hide');
          keysAll[57].classList.add('pulse'); // add pulse effect to Alt
          keysAll[42].classList.add('pulse'); // add pulse effect to Shift
        }
        break;

      case 'AltLeft':
        langSwitch();
        break;

      default:
    }
  }
});

keysArea.addEventListener('mouseup', () => { // add focus to textarea when committed mouseup event
  textArea.focus();
});
