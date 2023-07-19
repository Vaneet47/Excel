// Storage
// rows: anything defined in grid.js will be accessible here.
let sheetDB = [];

for (let i = 0; i < rows; i++) {
  let sheetRow = [];
  for (let j = 0; j < columns; j++) {
    let cellProp = {
      bold: false,
      italic: false,
      underline: false,
      alignment: 'left',
      fontFamily: 'sans-serif',
      fontSize: '14',
      fontColor: '#000000',
      BGcolor: '#ecf0f1',
      formula: '',
      value: '',
      children: [],
    };

    sheetRow.push(cellProp);
  }
  sheetDB.push(sheetRow);
}

// selector for cell properties
let bold = document.querySelector('.bold');
let italic = document.querySelector('.italic');
let underline = document.querySelector('.underline');

let fontSize = document.querySelector('.font-size-prop');
let fontFamily = document.querySelector('.font-family-prop');
let fontColor = document.querySelector('.font-color-prop');
let BGcolor = document.querySelector('.BGcolor-prop');

let alignment = document.querySelectorAll('.alignment');
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

let formulaBar = document.querySelector('.formula-bar');

//
let activeColorProp = '#d1d8e0';
let inactiveColorProp = '#ecf0f1';

// using addressBar to identify the cell row and col
const identifyCurrentCell = (address) => {
  let colCharacter = address[0];
  let rowOneBased = Number(address.slice(1));
  let col = colCharacter.charCodeAt(0) - 65;
  let row = rowOneBased - 1;
  return [row, col];
};

// get current active cell and corresponding cell properties
const getCellAndCellProp = (address) => {
  const [row, col] = identifyCurrentCell(address);
  let cell = document.querySelector(`.cell[rowId="${row}"][columnId="${col}"]`);
  let cellProp = sheetDB[row][col];
  return [cell, cellProp];
};

// get UI state on cell click
let cells = document.querySelectorAll('.cell');

cells.forEach((singlCell) => {
  singlCell.addEventListener('click', (e) => {
    let address = addressBar.value; // addressBar already defined in grid.js
    const [cell, cellProp] = getCellAndCellProp(address);

    // bold
    cell.style.fontWeight = cellProp.bold ? 'bold' : 'normal'; // UI change
    bold.style.backgroundColor = cellProp.bold
      ? activeColorProp
      : inactiveColorProp;

    // italic
    cell.style.fontStyle = cellProp.italic ? 'italic' : 'normal'; // UI change
    italic.style.backgroundColor = cellProp.italic
      ? activeColorProp
      : inactiveColorProp;

    //underline
    cell.style.textDecoration = cellProp.underline ? 'underline' : 'none'; // UI change
    underline.style.backgroundColor = cellProp.underline
      ? activeColorProp
      : inactiveColorProp;

    //fontSize
    cell.style.fontSize = cellProp.fontSize + 'px'; // UI change
    fontSize.value = cellProp.fontSize;

    cell.style.fontFamily = cellProp.fontFamily; // UI change
    fontFamily.value = cellProp.fontFamily;

    cell.style.color = cellProp.fontColor;
    fontColor.value = cellProp.fontColor;

    cell.style.backgroundColor = cellProp.BGcolor;
    BGcolor.value = cellProp.BGcolor;

    switch (cellProp.alignment) {
      case 'left':
        cell.style.justifyContent = cellProp.alignment;
        leftAlign.style.backgroundColor = activeColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case 'right':
        cell.style.justifyContent = cellProp.alignment;
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = activeColorProp;
        break;
      case 'center':
        cell.style.justifyContent = cellProp.alignment;
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = activeColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;
    }

    formulaBar.value = cellProp.formula;

    // cell.value = cellProp.value;
  });
});

// set UI on event
bold.addEventListener('click', (e) => {
  let address = addressBar.value; // addressBar already defined in grid.js
  const [cell, cellProp] = getCellAndCellProp(address);
  cellProp.bold = !cellProp.bold; // data change
  cell.style.fontWeight = cellProp.bold ? 'bold' : 'normal'; // UI change
  bold.style.backgroundColor = cellProp.bold
    ? activeColorProp
    : inactiveColorProp;
});

italic.addEventListener('click', (e) => {
  let address = addressBar.value; // addressBar already defined in grid.js
  const [cell, cellProp] = getCellAndCellProp(address);
  cellProp.italic = !cellProp.italic; // data change
  cell.style.fontStyle = cellProp.italic ? 'italic' : 'normal'; // UI change
  italic.style.backgroundColor = cellProp.italic
    ? activeColorProp
    : inactiveColorProp;
});

underline.addEventListener('click', (e) => {
  let address = addressBar.value; // addressBar already defined in grid.js
  const [cell, cellProp] = getCellAndCellProp(address);
  cellProp.underline = !cellProp.underline; // data change
  cell.style.textDecoration = cellProp.underline ? 'underline' : 'none'; // UI change
  underline.style.backgroundColor = cellProp.underline
    ? activeColorProp
    : inactiveColorProp;
});

// fontSize is a select item
fontSize.addEventListener('change', (e) => {
  let address = addressBar.value; // addressBar already defined in grid.js
  const [cell, cellProp] = getCellAndCellProp(address);
  cellProp.fontSize = fontSize.value; // Data change in db
  cell.style.fontSize = cellProp.fontSize + 'px'; // UI change
});

fontFamily.addEventListener('change', (e) => {
  let address = addressBar.value; // addressBar already defined in grid.js
  const [cell, cellProp] = getCellAndCellProp(address);
  cellProp.fontFamily = fontFamily.value; // Data change in db
  cell.style.fontFamily = cellProp.fontFamily; // UI change
});

fontColor.addEventListener('change', (e) => {
  let address = addressBar.value; // addressBar already defined in grid.js
  const [cell, cellProp] = getCellAndCellProp(address);
  cellProp.fontColor = fontColor.value;
  cell.style.color = cellProp.fontColor;
});

BGcolor.addEventListener('change', (e) => {
  let address = addressBar.value; // addressBar already defined in grid.js
  const [cell, cellProp] = getCellAndCellProp(address);
  cellProp.BGcolor = BGcolor.value;
  cell.style.backgroundColor = cellProp.BGcolor;
});

/// alignment
leftAlign.addEventListener('click', (e) => {
  let address = addressBar.value; // addressBar already defined in grid.js
  const [cell, cellProp] = getCellAndCellProp(address);
  cellProp.alignment = 'left';
  cell.style.justifyContent = cellProp.alignment;

  leftAlign.style.backgroundColor = activeColorProp;
  centerAlign.style.backgroundColor = inactiveColorProp;
  rightAlign.style.backgroundColor = inactiveColorProp;
});

rightAlign.addEventListener('click', (e) => {
  let address = addressBar.value; // addressBar already defined in grid.js
  const [cell, cellProp] = getCellAndCellProp(address);
  cellProp.alignment = 'right';
  cell.style.justifyContent = cellProp.alignment;

  leftAlign.style.backgroundColor = inactiveColorProp;
  centerAlign.style.backgroundColor = inactiveColorProp;
  rightAlign.style.backgroundColor = activeColorProp;
});

centerAlign.addEventListener('click', (e) => {
  let address = addressBar.value; // addressBar already defined in grid.js
  const [cell, cellProp] = getCellAndCellProp(address);
  cellProp.alignment = 'center';
  cell.style.justifyContent = cellProp.alignment;

  leftAlign.style.backgroundColor = inactiveColorProp;
  centerAlign.style.backgroundColor = activeColorProp;
  rightAlign.style.backgroundColor = inactiveColorProp;
});
