let sheetFolderCont = document.querySelector('.sheets-folder-cont');

let addSheetBtn = document.querySelector('.sheet-add-icon');

let activeSheetColor = '#ced6e0';

addSheetBtn.addEventListener('click', (e) => {
  let newSheet = document.createElement('div');
  newSheet.setAttribute('class', 'sheet-folder');

  let allSheetFolders = document.querySelectorAll('.sheet-folder');
  newSheet.setAttribute('id', allSheetFolders.length);

  newSheet.innerHTML = `<div class="sheet-content">Sheet ${
    allSheetFolders.length + 1
  }</div>`;
  sheetFolderCont.appendChild(newSheet);
  newSheet.scrollIntoView();

  sheetContainerDb();
  componentMatrixContainerDb();
  handleSheetActive(newSheet);
  handleSheetRemoval(newSheet);
  newSheet.click();
});

function handleSheetRemoval(sheet) {
  sheet.addEventListener('mousedown', (e) => {
    if (e.button !== 2) {
      return;
    } // 0 -> left 1-> centre 2 -> right click
    let allSheetFolders = document.querySelectorAll('.sheet-folder');

    if (allSheetFolders.length === 1) {
      alert('You need to have atleast one sheet!');
      return;
    }

    let res = confirm('Your sheet will be removed permanently, Are you sure?');

    if (!res) return;

    let sheetIdx = Number(sheet.getAttribute('id'));

    //DB
    sheetContainer.splice(sheetIdx, 1);
    componentMatrixContainer.splice(sheetIdx, 1);

    handleSheetUIRemoval(sheet);

    sheetDB = sheetContainer[0];
    graphComponentMatrix = componentMatrixContainer[0];
    handleSheetProperties();
  });
}

function handleSheetUIRemoval(sheet) {
  // UI
  sheet.remove();

  let allSheetFolders = document.querySelectorAll('.sheet-folder');

  for (let i = 0; i < allSheetFolders.length; i++) {
    allSheetFolders[i].setAttribute('id', i);
    let sheetContent = allSheetFolders[i].querySelector('.sheet-content');
    sheetContent.innerText = `Sheet ${i + 1}`;
    allSheetFolders[i].style.backgroundColor = 'transparent';
  }

  allSheetFolders[0].style.backgroundColor = activeSheetColor;
}

function handleSheetDB(sheetIdx) {
  sheetDB = sheetContainer[sheetIdx];
  graphComponentMatrix = componentMatrixContainer[sheetIdx];
}

function handleSheetProperties() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      let cell = document.querySelector(`.cell[rowId="${i}"][columnId="${j}"]`);
      cell.click();
    }
  }
  // click first cell by default via dom
  // query selector will give the first element it finds
  let firstCell = document.querySelector('.cell');

  firstCell.click();
}

function handleSheetUI(sheet) {
  let allSheetFolders = document.querySelectorAll('.sheet-folder');

  for (let i = 0; i < allSheetFolders.length; i++) {
    allSheetFolders[i].style.backgroundColor = 'transparent';
  }

  sheet.style.backgroundColor = activeSheetColor;
}

function handleSheetActive(sheet) {
  sheet.addEventListener('click', (e) => {
    let sheetIdx = Number(sheet.getAttribute('id'));
    handleSheetDB(sheetIdx);
    handleSheetProperties();
    handleSheetUI(sheet);
  });
}

function sheetContainerDb() {
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

  sheetContainer.push(sheetDB);
}

function componentMatrixContainerDb() {
  let graphComponentMatrix = [];

  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < columns; j++) {
      // why array -> more than 1 child relationship
      row.push([]);
    }
    graphComponentMatrix.push(row);
  }

  componentMatrixContainer.push(graphComponentMatrix);
}
