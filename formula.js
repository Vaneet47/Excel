// cell value setter - storing last value when clicking outside the cell
cells.forEach((singleCell) => {
  singleCell.addEventListener('blur', (e) => {
    const [cell, cellProp] = getCellAndCellProp(addressBar.value);
    let enteredData = cell.innerText;

    if (enteredData == cellProp.value) {
      return;
    }
    cellProp.value = enteredData;

    removeChildFromParents(cellProp.formula);
    updateChildren(cellProp);
    cellProp.formula = '';
  });
});

const updateChildren = (cellProp) => {
  let children = cellProp.children;
  for (let i = 0; i < children.length; i++) {
    const [childCell, childCellProp] = getCellAndCellProp(children[i]);
    let newEval = evaluate(childCellProp.formula);
    childCell.innerText = newEval; // UI
    childCellProp.value = newEval; // data change
    updateChildren(childCellProp);
  }
};

formulaBar.addEventListener('keydown', (e) => {
  let inputFormula = formulaBar.value;
  if (e.key === 'Enter' && inputFormula) {
    let evaluatedValue = evaluate(inputFormula);
    const [childCell, childCellProp] = getCellAndCellProp(addressBar.value);

    if (inputFormula !== childCellProp.formula) {
      removeChildFromParents(inputFormula);
    }

    // establish a relationship
    addChildrenToParents(inputFormula);

    childCell.innerText = evaluatedValue; // UI
    childCellProp.value = evaluatedValue; // data change
    childCellProp.formula = inputFormula; // data change
    updateChildren(childCellProp);
  }
});

const evaluate = (inputFormula) => {
  inputFormula = inputFormula.split(' ');
  for (let i = 0; i < inputFormula.length; i++) {
    let ascii = inputFormula[i].charCodeAt(0);
    if (ascii >= 65 && ascii <= 90) {
      const [cell, cellProp] = getCellAndCellProp(inputFormula[i]);
      inputFormula[i] = cellProp.value;
    }
  }
  inputFormula = inputFormula.join(' ');
  return eval(inputFormula);
};

const addChildrenToParents = (formula) => {
  let childrenAddress = addressBar.value;
  formula = formula.split(' ');
  for (let i = 0; i < formula.length; i++) {
    let ascii = formula[i].charCodeAt(0);
    if (ascii >= 65 && ascii <= 90) {
      const [parentCell, parentCellProp] = getCellAndCellProp(formula[i]);
      parentCellProp.children.push(childrenAddress);
    }
  }
};

const removeChildFromParents = (formula) => {
  let childrenAddress = addressBar.value;
  formula = formula.split(' ');
  for (let i = 0; i < formula.length; i++) {
    let ascii = formula[i].charCodeAt(0);
    if (ascii >= 65 && ascii <= 90) {
      const [parentCell, parentCellProp] = getCellAndCellProp(formula[i]);
      let idx = parentCellProp.children.indexOf(childrenAddress);
      parentCellProp.children.splice(idx, 1);
    }
  }
};
