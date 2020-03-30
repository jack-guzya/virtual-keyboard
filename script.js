class Row {
  // конструктор рядов
  constructor(...keys) {
    for (let i = 0; i < keys.length; i++) {
      this[`key${i}`] = keys[i];
    }
    Row.arrayOfRows.push(this); // добавление в массив из созданных рядов
  }
}

Row.arrayOfRows = []; // массив из созданных рядов

function createRows(array, divTarget) {
  // создание рядов

  for (let row of array) {
    let divRow = document.createElement("div");
    divRow.className = "row";
    divTarget.append(divRow);

    //создание клавишей в рядах
    for (let key in row) {
      let divKey = document.createElement("div"),
        secondaryLetter = document.createElement("p"),
        mainLetter = document.createElement("p");

      divKey.className = "key";
      secondaryLetter.className = "secondary-letter";
      mainLetter.className = "main-letter";

      if (row[key].mainFunc) {
        divKey.classList.add("func");
        divKey.classList.add(row[key].class);
        mainLetter.insertAdjacentHTML("afterbegin", row[key].mainFunc);
        divKey.append(mainLetter);
      } else {
        secondaryLetter.insertAdjacentHTML("afterbegin", row[key].secondary);
        mainLetter.insertAdjacentHTML("afterbegin", row[key].main);
        divKey.append(mainLetter);
        divKey.append(secondaryLetter);
      }
      divRow.append(divKey); //добавление клавиш к ряду
    }
  }
}

const row1 = new Row(
  { main: "ё", secondary: "" },
  { main: "1", secondary: "!" },
  { main: "2", secondary: '"' },
  { main: "3", secondary: "№" },
  { main: "4", secondary: ";" },
  { main: "5", secondary: "%" },
  { main: "6", secondary: ":" },
  { main: "7", secondary: "?" },
  { main: "8", secondary: "*" },
  { main: "9", secondary: "(" },
  { main: "0", secondary: ")" },
  { main: "-", secondary: "_" },
  { main: "=", secondary: "+" },
  { mainFunc: "Backspace", class: "backspace" }
);

const row2 = new Row(
  { mainFunc: "Tab", class: "tab" },
  { main: "й", secondary: "" },
  { main: "ц", secondary: "" },
  { main: "у", secondary: "" },
  { main: "к", secondary: "" },
  { main: "е", secondary: "" },
  { main: "н", secondary: "" },
  { main: "г", secondary: "" },
  { main: "ш", secondary: "" },
  { main: "щ", secondary: "" },
  { main: "з", secondary: "" },
  { main: "х", secondary: "" },
  { main: "ъ", secondary: "" },
  { main: "\\", secondary: "|" },
  { mainFunc: "Del", class: "del" }
);

const row3 = new Row(
  { mainFunc: "Caps Lock", class: "caps" },
  { main: "ф", secondary: "" },
  { main: "ы", secondary: "" },
  { main: "в", secondary: "" },
  { main: "а", secondary: "" },
  { main: "п", secondary: "" },
  { main: "р", secondary: "" },
  { main: "о", secondary: "" },
  { main: "л", secondary: "" },
  { main: "д", secondary: "" },
  { main: "ж", secondary: "" },
  { main: "э", secondary: "" },
  { mainFunc: "Enter", class: "enter" }
);

const row4 = new Row(
  { mainFunc: "Shift", class: "shift-left" },
  { main: "я", secondary: "" },
  { main: "ч", secondary: "" },
  { main: "с", secondary: "" },
  { main: "м", secondary: "" },
  { main: "и", secondary: "" },
  { main: "т", secondary: "" },
  { main: "ь", secondary: "" },
  { main: "б", secondary: "" },
  { main: "ю", secondary: "" },
  { main: ".", secondary: "," },
  { mainFunc: "Shift", class: "shift-right" },
  { mainFunc: "&uarr;", class: "up" }
);

const row5 = new Row(
  { mainFunc: "Ctrl", class: "ctrl-left" },
  { mainFunc: "Win", class: "win" },
  { mainFunc: "Alt", class: "alt-left" },
  { mainFunc: "&mdash;", class: "space" },
  { mainFunc: "Alt", class: "alt-right" },
  { mainFunc: "Ctrl", class: "ctrl-right" },
  { mainFunc: "&larr;", class: "left" },
  { mainFunc: "&darr;", class: "down" },
  { mainFunc: "&rarr;", class: "right" }
);

// создание базовой структуры

const virtualKeyboard = document.createElement("div");

virtualKeyboard.className = "virtual-keyboard";
virtualKeyboard.insertAdjacentHTML("afterbegin", "<textarea></textarea>");

document.body.append(virtualKeyboard);

const keysArea = document.createElement("div");
keysArea.className = "keys-area";

virtualKeyboard.append(keysArea);

createRows(Row.arrayOfRows, keysArea);
