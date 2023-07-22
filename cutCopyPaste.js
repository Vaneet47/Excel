let ctrlKey = null;
let metaKey = null;

let copyBtn = document.querySelector('.copy');
let cutBtn = document.querySelector('.cut');
let pasteBtn = document.querySelector('.paste');

document.addEventListener('keydown', (e) => {
  ctrlKey = e.ctrlKey;
  metaKey = e.metaKey;
});
document.addEventListener('keyup', (e) => {
  ctrlKey = e.ctrlKey;
  metaKey = e.metaKey;
});

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < columns; j++) {
    let cell = document.querySelector(`.cell[rowId="${i}"][columnId="${j}"]`);
    handleSelectedCells(cell);
  }
}

let rangeStorage = [];

function handleSelectedCells(cell) {
  cell.addEventListener('click', (e) => {
    // select cells range work

    if (ctrlKey || metaKey) {
      if (rangeStorage.length >= 2) {
        handleSelectedCellsUI();
        rangeStorage = [];
      }

      // UI
      cell.style.border = '3px solid #218c74';

      let rid = Number(cell.getAttribute('rowId'));
      let cid = Number(cell.getAttribute('columnId'));

      rangeStorage.push([rid, cid]);
    } else if (!ctrlKey && !metaKey) {
      handleSelectedCellsUI();
    }
  });
}

function handleSelectedCellsUI() {
  for (let i = 0; i < rangeStorage.length; i++) {
    let cell = document.querySelector(
      `.cell[rowId="${rangeStorage[i][0]}"][columnId="${rangeStorage[i][1]}"]`
    );

    cell.style.border = '1px solid lightgrey';
  }
}

let copyData = [];

copyBtn.addEventListener('click', (e) => {
  if (rangeStorage.length < 2) return;
  copyData = [];
  for (let i = rangeStorage[0][0]; i <= rangeStorage[1][0]; i++) {
    let copyRow = [];
    for (let j = rangeStorage[0][1]; j <= rangeStorage[1][1]; j++) {
      let cellProp = sheetDB[i][j];
      copyRow.push(cellProp);
    }
    copyData.push(copyRow);
  }
  handleSelectedCellsUI();
});

let cut = false;

cutBtn.addEventListener('click', (e) => {
  if (rangeStorage.length < 2) return;
  cut = true;
  copyData = [];
  for (let i = rangeStorage[0][0]; i <= rangeStorage[1][0]; i++) {
    let copyRow = [];
    for (let j = rangeStorage[0][1]; j <= rangeStorage[1][1]; j++) {
      // DB work
      let cellProp = sheetDB[i][j];
      copyRow.push(cellProp);
    }
    copyData.push(copyRow);
  }
  handleSelectedCellsUI();
});

pasteBtn.addEventListener('click', (e) => {
  if (rangeStorage.length < 2) return;

  const [row, col] = identifyCurrentCell(addressBar.value);

  let rowDiff = Math.abs(rangeStorage[1][0] - rangeStorage[0][0]);
  let colDiff = Math.abs(rangeStorage[1][1] - rangeStorage[0][1]);

  // r -> refers copy data row,
  // c -> refers copy data column
  for (let i = row, r = 0; i <= rowDiff + row; i++, r++) {
    for (let j = col, c = 0; j <= colDiff + col; j++, c++) {
      //   sheetDB[i][j] = sheetDB[i - rowDiff][j - colDiff];
      let cell = document.querySelector(`.cell[rowId="${i}"][columnId="${j}"]`);
      if (!cell) continue;

      let data = copyData[r][c];
      let cellProp = sheetDB[i][j];
      //   console.log(i, j);
      //   console.log(sheetDB[i][j]);
      //   console.log(cellProp);
      //   console.log(data);

      //   sheetDB[i][j] = copyData[r][c];

      cellProp.value = data.value;
      cellProp.bold = data.bold;
      cellProp.italic = data.italic;
      cellProp.underline = data.underline;
      cellProp.fontSize = data.fontSize;
      cellProp.fontFamily = data.fontFamily;
      cellProp.fontColor = data.fontColor;
      cellProp.BGcolor = data.BGcolor;
      cellProp.alignment = data.alignment;

      if (cut) {
        let cell = document.querySelector(
          `.cell[rowId="${i - row + rangeStorage[0][0]}"][columnId="${
            j - col + rangeStorage[0][1]
          }"]`
        );
        let cellProp =
          sheetDB[i - row + rangeStorage[0][0]][j - col + rangeStorage[0][1]];
        handleCutData(cell, cellProp);
      }

      cell.click();
    }
  }
  if (cut) {
    cut = false;
  }
  handleSelectedCellsUI();
});

function handleCutData(cell, cellProp) {
  cellProp.value = '';
  cellProp.bold = false;
  cellProp.italic = false;
  cellProp.underline = false;
  cellProp.fontSize = 14;
  cellProp.fontFamily = 'sans-serif';
  cellProp.fontColor = '#000000';
  cellProp.BGcolor = '#ecf0f1';
  cellProp.alignment = 'left';

  cell.click();
}
