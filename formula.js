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

formulaBar.addEventListener('keydown', async (e) => {
  let inputFormula = formulaBar.value;
  if (e.key === 'Enter' && inputFormula) {
    const [childCell, childCellProp] = getCellAndCellProp(addressBar.value);

    // establish a relationship in graph component
    // inputFormula -> to find the parents
    // addressBar.value -> child component
    addChildToGraphComponent(inputFormula, addressBar.value);
    // check formula is cyclic or not, if not cyclic; then only evaluate
    let cycleSource = isGraphCyclic(graphComponentMatrix);
    if (cycleSource) {
      // alert('Your formula is cyclic');
      let response = confirm(
        'Your formula is cyclic. Do you want to trace your path?'
      );
      while (response) {
        await isGraphCyclicTracePath(graphComponentMatrix, cycleSource);
        response = confirm(
          'Your formula is cyclic. Do you want to trace your path?'
        );
      }

      removeChildFromGraphComponent(inputFormula, addressBar.value);
      return;
    }

    if (inputFormula !== childCellProp.formula) {
      removeChildFromParents(inputFormula);
    }
    let evaluatedValue = evaluate(inputFormula);

    // establish a relationship add children in parent cell props
    addChildrenToParents(inputFormula);

    childCell.innerText = evaluatedValue; // UI
    childCellProp.value = evaluatedValue; // data change
    childCellProp.formula = inputFormula; // data change
    updateChildren(childCellProp);
  }
});

function removeChildFromGraphComponent(formula, childAddress) {
  formula = formula.split(' ');
  const [row, col] = identifyCurrentCell(childAddress);
  for (let i = 0; i < formula.length; i++) {
    let ascii = formula[i].charCodeAt(0);
    if (ascii >= 65 && ascii <= 90) {
      const [parentRow, parentCol] = identifyCurrentCell(formula[i]);
      graphComponentMatrix[parentRow][parentCol].pop();
    }
  }
}

function addChildToGraphComponent(formula, childAddress) {
  const [row, col] = identifyCurrentCell(childAddress);
  formula = formula.split(' ');
  for (let i = 0; i < formula.length; i++) {
    let ascii = formula[i].charCodeAt(0);
    if (ascii >= 65 && ascii <= 90) {
      const [parentRow, parentCol] = identifyCurrentCell(formula[i]);
      graphComponentMatrix[parentRow][parentCol].push([row, col]);
    }
  }
}

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
