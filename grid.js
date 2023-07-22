let rows = 100;
let columns = 26;

let addressColCont = document.querySelector('.address-col-cont');

for (let i = 0; i < rows; i++) {
  let addressColCell = document.createElement('div');
  addressColCell.setAttribute('class', 'address-col-cell');
  addressColCell.innerText = i + 1;
  addressColCont.appendChild(addressColCell);
}

let addressRowCont = document.querySelector('.address-row-cont');

for (let i = 0; i < columns; i++) {
  let addressRowCell = document.createElement('div');
  addressRowCell.setAttribute('class', 'address-row-cell');
  addressRowCell.innerText = String.fromCharCode(65 + i);
  addressRowCont.appendChild(addressRowCell);
}

let cellsCont = document.querySelector('.cells-cont');

for (let i = 0; i < rows; i++) {
  let gridCellRow = document.createElement('div');
  gridCellRow.setAttribute('class', 'cell-row');

  for (let j = 0; j < columns; j++) {
    let gridCell = document.createElement('div');
    gridCell.setAttribute('class', 'cell');
    gridCell.setAttribute('contenteditable', 'true');
    gridCell.setAttribute('spellcheck', 'false');
    // gridCell.setAttribute('overflow', 'hidden');

    // for cell and storage identification
    gridCell.setAttribute('rowId', i);
    gridCell.setAttribute('columnId', j);

    addListenerForAddressBarDisplay(gridCell, i, j);
    gridCellRow.appendChild(gridCell);
  }
  cellsCont.appendChild(gridCellRow);
}

let addressBar = document.querySelector('.address-bar');

function addListenerForAddressBarDisplay(cell, i, j) {
  cell.addEventListener('click', () => {
    let rowId = i + 1;
    let colId = String.fromCharCode(65 + j);
    let res = colId + rowId;
    addressBar.value = res;
  });
}
