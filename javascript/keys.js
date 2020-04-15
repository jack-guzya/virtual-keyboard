const row1 = [
  { id: 'Backquote' },
  { id: 'Digit1' },
  { id: 'Digit2' },
  { id: 'Digit3' },
  { id: 'Digit4' },
  { id: 'Digit5' },
  { id: 'Digit6' },
  { id: 'Digit7' },
  { id: 'Digit8' },
  { id: 'Digit9' },
  { id: 'Digit0' },
  { id: 'Minus' },
  { id: 'Equal' },
  { class: 'backspace', id: 'Backspace' },
];

const row2 = [
  { class: 'tab', id: 'Tab' },
  { id: 'KeyQ' },
  { id: 'KeyW' },
  { id: 'KeyE' },
  { id: 'KeyR' },
  { id: 'KeyT' },
  { id: 'KeyY' },
  { id: 'KeyU' },
  { id: 'KeyI' },
  { id: 'KeyO' },
  { id: 'KeyP' },
  { id: 'BracketLeft' },
  { id: 'BracketRight' },
  { id: 'Backslash' },
  { func: 'Del', class: 'del', id: 'Delete' },
];

const row3 = [
  { class: 'caps', id: 'CapsLock' },
  { id: 'KeyA' },
  { id: 'KeyS' },
  { id: 'KeyD' },
  { id: 'KeyF' },
  { id: 'KeyG' },
  { id: 'KeyH' },
  { id: 'KeyJ' },
  { id: 'KeyK' },
  { id: 'KeyL' },
  { id: 'Semicolon' },
  { id: 'Quote' },
  { class: 'enter', id: 'Enter' },
];

const row4 = [
  { class: 'shift-left', id: 'ShiftLeft' },
  { id: 'KeyZ' },
  { id: 'KeyX' },
  { id: 'KeyC' },
  { id: 'KeyV' },
  { id: 'KeyB' },
  { id: 'KeyN' },
  { id: 'KeyM' },
  { id: 'Comma' },
  { id: 'Period' },
  { id: 'Slash' },
  { class: 'shift-right', id: 'ShiftRight' },
  { class: 'up', id: 'ArrowUp' },
];

const row5 = [
  { class: 'ctrl-left', id: 'ControlLeft' },
  { class: 'win', id: 'MetaLeft' },
  { class: 'alt-left', id: 'AltLeft' },
  { class: 'space', id: 'Space' },
  { class: 'alt-right', id: 'AltRight' },
  { class: 'ctrl-right', id: 'ControlRight' },
  { class: 'left', id: 'ArrowLeft' },
  { class: 'down', id: 'ArrowDown' },
  { class: 'right', id: 'ArrowRight' },
];

export default [row1, row2, row3, row4, row5];
