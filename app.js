import idKeys from './javascript/keys.js';
import {
  createKeys, addLetterToInput, switchKeys,
} from './javascript/creating-keys.js';

let caps = false;
let shift = false;
let infoBlocks = true;

const virtualKeyboard = document.createElement('div');
const textArea = document.createElement('textarea');
const keysArea = document.createElement('div');

const callInfo = document.createElement('div');
const callInfoDescription = document.createElement('p');
const info = document.createElement('div');
const osInfo = document.createElement('p');
const langSwitchInfo = document.createElement('p');

const langInfo = document.createElement('div');
const shiftInfo = document.createElement('div');
const navigationInfo = document.createElement('div');
const greatMind = document.createElement('div');
const errorInfo = document.createElement('div');

function createSessionStorage() {
  if (sessionStorage.getItem('lang') === null) {
    sessionStorage.setItem('lang', 'RU');
  }
}

function createLayout() {
  virtualKeyboard.className = 'virtual-keyboard';
  keysArea.className = 'keys-area';
  virtualKeyboard.append(textArea, keysArea);
  createKeys(idKeys, keysArea);
  switchKeys(sessionStorage.getItem('lang'), keysArea, shift, caps);
  document.body.append(virtualKeyboard);
}

function createInfoBlocks() {
  callInfo.className = 'call-info';
  callInfoDescription.className = 'call-info__description';

  info.className = 'info';
  info.classList.add('hide');
  osInfo.className = 'info__os';
  langSwitchInfo.className = 'info__lang-switch';

  langInfo.className = 'lang-info';
  langInfo.classList.add('hide');

  shiftInfo.className = 'info__shift';
  shiftInfo.classList.add('hide');

  navigationInfo.className = 'info__navigation';
  navigationInfo.classList.add('hide');

  greatMind.className = 'info__great-mind';
  greatMind.classList.add('hide');

  errorInfo.className = 'info__error';
  errorInfo.classList.add('hide');

  document.body.append(langInfo);
  callInfo.append(callInfoDescription);
  info.append(osInfo, langSwitchInfo);
  virtualKeyboard.append(callInfo, info, shiftInfo, navigationInfo, errorInfo, greatMind);

  osInfo.innerHTML = 'Клавиатура разработана для операционной системы Windows';
  langSwitchInfo.innerHTML = 'Для переключения языка нажмите Alt+Shift на физической или Alt Left на виртуальной клавиатуре';
  callInfoDescription.innerHTML = 'Для вызова справки нажмите Ctrl Right';
  shiftInfo.innerHTML = 'Клавиша Shift Left зажимается на виртуальной клавиатуре автоматически при клике мышкой. При зажатой клавише Shift Left клавиша Сapslock недоступна (она вам и не нужна при таком сценарии)';
  navigationInfo.innerHTML = 'Навигация по тексту осуществляется клавишами [←] и [→]';
  greatMind.innerHTML = 'Эти клавиши просто рисуют стрелки [↓] и [↑]. Не спрашивайте меня, почему именно так - это задумка Великого разума, нам этого не постичь';
  errorInfo.innerHTML = 'Упс! Данная клавиша взяла трудовой отпуск';
  langInfo.innerHTML = sessionStorage.getItem('lang');
}

function langSwitch() {
  if (sessionStorage.getItem('lang') === 'RU') {
    sessionStorage.setItem('lang', 'EN');
    switchKeys(sessionStorage.getItem('lang'), keysArea, shift, caps);
    langInfo.innerHTML = sessionStorage.getItem('lang');
    langInfo.classList.remove('hide');
  } else {
    sessionStorage.setItem('lang', 'RU');
    switchKeys(sessionStorage.getItem('lang'), keysArea, shift, caps);
    langInfo.innerHTML = sessionStorage.getItem('lang');
    langInfo.classList.remove('hide');
  }
}

function init() {
  createSessionStorage();
  createLayout();
  createInfoBlocks();
}

init();

const keysAll = keysArea.querySelectorAll('.key');
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

ctrlRightKey.classList.add('pulse');
callInfo.addEventListener('animationend', () => {
  callInfo.classList.add('hide');
  ctrlRightKey.classList.remove('pulse');
  infoBlocks = false;
});

info.addEventListener('animationend', () => {
  info.classList.add('hide');
  leftAltKey.classList.remove('pulse');
  capsLockKey.classList.add('pulse_great-mind');
  shiftInfo.classList.remove('hide');
});

shiftInfo.addEventListener('animationend', () => {
  shiftInfo.classList.add('hide');
  navigationInfo.classList.remove('hide');
  shiftLeftKey.classList.remove('pulse');
  capsLockKey.classList.remove('pulse_great-mind');
  rightKey.classList.add('pulse');
  leftKey.classList.add('pulse');
});

navigationInfo.addEventListener('animationend', () => {
  navigationInfo.classList.add('hide');
  rightKey.classList.remove('pulse');
  leftKey.classList.remove('pulse');
  greatMind.classList.remove('hide');
  downKey.classList.add('pulse_great-mind');
  upKey.classList.add('pulse_great-mind');
});

greatMind.addEventListener('animationend', () => {
  greatMind.classList.add('hide');
  downKey.classList.remove('pulse_great-mind');
  upKey.classList.remove('pulse_great-mind');
  infoBlocks = false;
});

errorInfo.addEventListener('animationend', () => {
  errorInfo.classList.add('hide');
  ctrlLeftKey.classList.remove('pulse');
  winKey.classList.remove('pulse');
  altRightKey.classList.remove('pulse');
});

info.addEventListener('animationend', () => {
  info.classList.add('hide');
});

langInfo.addEventListener('animationend', () => {
  langInfo.classList.add('hide');
});

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
      switchKeys(sessionStorage.getItem('lang'), keysArea, shift, caps);
      if (caps === false) {
        keyTarget.classList.remove('active');
      }
      break;

    case 'ShiftLeft':
    case 'ShiftRight':
      shift = true;
      switchKeys(sessionStorage.getItem('lang'), keysArea, shift, caps);
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
      if (infoBlocks === true) {
        break;
      } else {
        infoBlocks = true;
        info.classList.remove('hide');
        leftAltKey.classList.add('pulse');
        shiftLeftKey.classList.add('pulse');
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

  if (event.shiftKey && event.altKey) {
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
      keyTarget.classList.remove('active');
      shiftLeftKey.classList.remove('active');
      switchKeys(sessionStorage.getItem('lang'), keysArea, shift, caps);
      break;

    default:
      keyTarget.classList.remove('active');
  }
});

keysArea.addEventListener('mousedown', (event) => {
  if (/^key$/.test(event.target.getAttribute('class'))) {
    addLetterToInput(textArea, event.target.innerHTML);
  } else {
    switch (event.target.getAttribute('id')) {
      case 'Tab':
        addLetterToInput(textArea, '   ');
        break;

      case 'ShiftLeft':
        shift = !shift;
        event.target.classList.add('active');
        switchKeys(sessionStorage.getItem('lang'), keysArea, shift, caps);
        if (shift === false) {
          event.target.classList.remove('active');
        }
        break;

      case 'ShiftRight':
        if (shift === true) {
          break;
        } else {
          switchKeys(sessionStorage.getItem('lang'), keysArea, shift, caps);
          event.target.addEventListener('mouseup', () => {
            switchKeys(sessionStorage.getItem('lang'), keysArea, shift, caps);
          });
        }
        break;

      case 'CapsLock':
        if (shift === true) {
          break;
        }
        caps = !caps;
        event.target.classList.add('active');
        switchKeys(sessionStorage.getItem('lang'), keysArea, shift, caps);
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
        if (infoBlocks === true) {
          break;
        } else {
          infoBlocks = true;
          info.classList.remove('hide');
          leftAltKey.classList.add('pulse');
          shiftLeftKey.classList.add('pulse');
        }
        break;

      case 'ControlLeft':
        if (errorInfo.getAttribute('class') === 'info_error') {
          break;
        } else {
          errorInfo.classList.remove('hide');
          ctrlLeftKey.classList.add('pulse');
        }
        break;

      case 'MetaLeft':
        if (errorInfo.getAttribute('class') === 'info_error') {
          break;
        } else {
          errorInfo.classList.remove('hide');
          winKey.classList.add('pulse');
        }
        break;

      case 'AltRight':
        if (errorInfo.getAttribute('class') === 'info_error') {
          break;
        } else {
          errorInfo.classList.remove('hide');
          altRightKey.classList.add('pulse');
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
