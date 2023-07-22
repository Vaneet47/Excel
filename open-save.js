let downloadBtn = document.querySelector('.download');
let uploadBtn = document.querySelector('.upload');

downloadBtn.addEventListener('click', () => {
  let jsonData = JSON.stringify([sheetDB, graphComponentMatrix]);

  let file = new Blob([jsonData], { type: 'application/json' });

  let a = document.createElement('a');
  a.href = URL.createObjectURL(file);
  a.download = 'Sheet Data.json';
  a.click();
});

uploadBtn.addEventListener('click', (e) => {
  // opens file explorer
  let input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.click();

  input.addEventListener('change', (e) => {
    let fileReader = new FileReader();
    let files = input.files;
    let fileObj = files[0];

    fileReader.readAsText(fileObj);
    fileReader.addEventListener('load', (e) => {
      let readSheetData = JSON.parse(fileReader.result);
      let newSheetDb = readSheetData[0];
      let newGraphMatrix = readSheetData[1];

      // Basic sheet and graph with default data will be created
      addSheetBtn.click();

      sheetDB = newSheetDb;
      graphComponentMatrix = newGraphMatrix;
      sheetContainer[sheetContainer.length - 1] = sheetDB;
      componentMatrixContainer[componentMatrixContainer.length - 1] =
        graphComponentMatrix;

      handleSheetProperties();
    });
  });
});
