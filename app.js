import idKeys from './javascript/keys.js';
import {
  createKeys, addLetterToInput, switchKeys,
} from './javascript/creating-keys.js';

// create session storage

if (sessionStorage.getItem('lang') === null) {
  sessionStorage.setItem('lang', 'RU');
}

let caps = false;
let shift = false;
let infoBlocks = true;

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

switchKeys(sessionStorage.getItem('lang'), keysAll, shift, caps);

// create info blocks

const callInfo = document.createElement('div'); // start info block
const callInfoDescription = document.createElement('p');

const ctrlRightKey = keysAll[60];
const rightKey = keysAll[63];
const downKey = keysAll[62];
const leftKey = keysAll[61];
const leftAltKey = keysAll[57];
const shiftLeftKey = keysAll[42];
const capsLockKey = keysAll[29];
const upKey = keysAll[54];
const ctrlLeftKey = keysAll[55];
const winKey = keysAll[56];
const altRightKey = keysAll[59];


ctrlRightKey.classList.add('pulse'); // add pulse effect to ctrl right when call-info is active

callInfo.className = 'call-info';
callInfoDescription.className = 'call-info__description';

const info = document.createElement('div'); // info of OS
const osInfo = document.createElement('p');
const langSwitchInfo = document.createElement('p');

info.className = 'info';
info.classList.add('hide');
osInfo.className = 'info__os';
langSwitchInfo.className = 'info__lang-switch';

const langInfo = document.createElement('div'); // language info block (ru/en)
langInfo.className = 'lang-info';
langInfo.classList.add('hide');

const shiftInfo = document.createElement('div'); // shift info block
shiftInfo.className = 'info__shift';
shiftInfo.classList.add('hide');

const navigationInfo = document.createElement('div'); // navigation info block ([←] & [→])
navigationInfo.className = 'info__navigation';
navigationInfo.classList.add('hide');

const greatMind = document.createElement('div'); // navigation info block ([↓] & [↑])
greatMind.className = 'info__great-mind';
greatMind.classList.add('hide');

const errorInfo = document.createElement('div'); // error info block
errorInfo.className = 'info__error';
errorInfo.classList.add('hide');

document.body.append(langInfo);

virtualKeyboard.append(callInfo);
callInfo.append(callInfoDescription);


virtualKeyboard.append(info);
info.append(osInfo);
info.append(langSwitchInfo);

virtualKeyboard.append(shiftInfo);

virtualKeyboard.append(navigationInfo);

virtualKeyboard.append(errorInfo);

virtualKeyboard.append(greatMind);

osInfo.innerHTML = 'Клавиатура разработана для операционной системы Windows';
langSwitchInfo.innerHTML = 'Для переключения языка нажмите Alt+Shift на физической или Alt Left на виртуальной клавиатуре';

callInfoDescription.innerHTML = 'Для вызова справки нажмите Ctrl Right';

shiftInfo.innerHTML = 'Клавиша Shift Left зажимается на виртуальной клавиатуре автоматически при клике мышкой. При зажатой клавише Shift Left клавиша Сapslock недоступна (она вам и не нужна при таком сценарии)';

navigationInfo.innerHTML = 'Навигация по тексту осуществляется клавишами [←] и [→]';

greatMind.innerHTML = 'Эти клавиши просто рисуют стрелки [↓] и [↑]. Не спрашивайте меня, почему именно так - это задумка Великого разума, нам этого не постичь';

errorInfo.innerHTML = 'Упс! Данная клавиша взяла трудовой отпуск';

langInfo.innerHTML = sessionStorage.getItem('lang'); // change showing language info block after restart page

callInfo.addEventListener('animationend', () => {
  callInfo.classList.add('hide');
  ctrlRightKey.classList.remove('pulse'); // remove pulse effect
  infoBlocks = false;
});

info.addEventListener('animationend', () => {
  info.classList.add('hide');
  leftAltKey.classList.remove('pulse'); // remove pulse effectKey
  capsLockKey.classList.add('pulse_great-mind');
  shiftInfo.classList.remove('hide');
});

shiftInfo.addEventListener('animationend', () => {
  shiftInfo.classList.add('hide');
  navigationInfo.classList.remove('hide');
  shiftLeftKey.classList.remove('pulse'); // remove pulse effect (shift left)Key
  capsLockKey.classList.remove('pulse_great-mind'); // remove pulse effect (caps lock)
  rightKey.classList.add('pulse'); // add pulse effect ([→])
  leftKey.classList.add('pulse'); // add pulse effect ([←])
});

navigationInfo.addEventListener('animationend', () => {
  navigationInfo.classList.add('hide');
  rightKey.classList.remove('pulse'); // remove pulse effect ([→])
  leftKey.classList.remove('pulse'); // remove pulse effect ([←])
  greatMind.classList.remove('hide');
  downKey.classList.add('pulse_great-mind'); // add pulse effect ([↓])
  upKey.classList.add('pulse_great-mind'); // add pulse effect ([↑])
});

greatMind.addEventListener('animationend', () => {
  greatMind.classList.add('hide');
  downKey.classList.remove('pulse_great-mind'); // remove pulse effect ([↓])
  upKey.classList.remove('pulse_great-mind'); // remove pulse effect ([↑])
  infoBlocks = false; // block ending
});

errorInfo.addEventListener('animationend', () => {
  errorInfo.classList.add('hide');
  ctrlLeftKey.classList.remove('pulse'); // remove pulse effect (CtrlLeft)
  winKey.classList.remove('pulse'); // remove pulse effect (Win)
  altRightKey.classList.remove('pulse'); // remove pulse effect (AltRight)
});

// create lang switch function

function langSwitch() {
  if (sessionStorage.getItem('lang') === 'RU') {
    sessionStorage.setItem('lang', 'EN');
    switchKeys(sessionStorage.getItem('lang'), keysAll, shift, caps);
    langInfo.innerHTML = sessionStorage.getItem('lang');
    langInfo.classList.remove('hide');
  } else {
    sessionStorage.setItem('lang', 'RU');
    switchKeys(sessionStorage.getItem('lang'), keysAll, shift, caps);
    langInfo.innerHTML = sessionStorage.getItem('lang');
    langInfo.classList.remove('hide');
  }
}

langInfo.addEventListener('animationend', () => {
  langInfo.classList.add('hide');
});

// Add event to keys

document.addEventListener('keydown', (event) => {
  const keyTarget = document.getElementById(`${event.code}`);
  event.preventDefault();
  keyTarget.classList.add('active');

  switch (event.code) {
    case 'Tab':
      addLetterToInput(textArea, '   ');
      break;

    case 'Space':
      addLetterToInput(textArea, ' ');
      break;

    case 'CapsLock':
      caps = !caps;
      switchKeys(sessionStorage.getItem('lang'), keysAll, shift, caps);
      if (caps === false) {
        keyTarget.classList.remove('active');
      }
      break;

    case 'ShiftLeft':
    case 'ShiftRight':
      shift = true;
      switchKeys(sessionStorage.getItem('lang'), keysAll, shift, caps);
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
      if (infoBlocks === true) { // info blocks already running
        break;
      } else {
        infoBlocks = true;
        info.classList.remove('hide');
        leftAltKey.classList.add('pulse'); // add pulse effect
        shiftLeftKey.classList.add('pulse'); // add pulse effect to Shift
      }
      break;

    case 'ControlLeft':
    case 'MetaLeft':
    case 'AltLeft':
    case 'AltRight':
      break;

    default:
      addLetterToInput(textArea, keyTarget.innerHTML);
  }

  info.addEventListener('animationend', () => {
    info.classList.add('hide');
  });

  if (event.shiftKey && event.altKey) { // switch language
    langSwitch();
  }
});

document.addEventListener('keyup', (event) => {
  const keyTarget = document.getElementById(`${event.code}`);

  switch (event.code) {
    case 'CapsLock':
      if (!caps) {
        keyTarget.classList.remove('active');
        break;
      } else break;

    case 'ShiftLeft':
    case 'ShiftRight':
      shift = false;
      keyTarget.classList.remove('active'); // shift right
      shiftLeftKey.classList.remove('active'); // shift left
      switchKeys(sessionStorage.getItem('lang'), keysAll, shift, caps);
      break;

    default:
      keyTarget.classList.remove('active');
  }
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
        shift = !shift;
        event.target.classList.add('active');
        switchKeys(sessionStorage.getItem('lang'), keysAll, shift, caps);
        if (shift === false) {
          event.target.classList.remove('active');
        }
        break;

      case 'ShiftRight':
        if (shift === true) { // if shift left is active
          break;
        } else {
          switchKeys(sessionStorage.getItem('lang'), keysAll, shift, caps);
          event.target.addEventListener('mouseup', () => {
            switchKeys(sessionStorage.getItem('lang'), keysAll, shift, caps);
          });
        }
        break;

      case 'CapsLock':
        if (shift === true) { // if shift left is active
          break;
        }
        caps = !caps;
        event.target.classList.add('active');
        switchKeys(sessionStorage.getItem('lang'), keysAll, shift, caps);
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
        if (infoBlocks === true) { // info blocks already running {
          break;
        } else {
          infoBlocks = true;
          info.classList.remove('hide');
          leftAltKey.classList.add('pulse'); // add pulse effect to Alt
          shiftLeftKey.classList.add('pulse'); // add pulse effect to Shift
        }
        break;

      case 'ControlLeft':
        if (errorInfo.getAttribute('class') === 'info_error') {
          break;
        } else {
          errorInfo.classList.remove('hide');
          ctrlLeftKey.classList.add('pulse'); // add pulse effect to CtrlLeft
        }
        break;

      case 'MetaLeft':
        if (errorInfo.getAttribute('class') === 'info_error') {
          break;
        } else {
          errorInfo.classList.remove('hide');
          winKey.classList.add('pulse'); // add pulse effect to Win
        }
        break;

      case 'AltRight':
        if (errorInfo.getAttribute('class') === 'info_error') {
          break;
        } else {
          errorInfo.classList.remove('hide');
          altRightKey.classList.add('pulse'); // add pulse effect to Al
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
