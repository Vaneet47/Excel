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
    addListenerForAddressBarDisplay(gridCell, i + 1, j);
    gridCellRow.appendChild(gridCell);
  }
  cellsCont.appendChild(gridCellRow);
}

let addressBar = document.querySelector('.address-bar');

function addListenerForAddressBarDisplay(cell, i, j) {
  cell.addEventListener('click', () => {
    let char = String.fromCharCode(65 + j);
    let res = char + i;
    addressBar.value = res;
  });
}
