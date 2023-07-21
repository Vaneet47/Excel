function colorPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

async function isGraphCyclicTracePath(graphComponentMatrix, cycleSource) {
  let [srcr, srcc] = cycleSource;
  let visited = [];
  let dfsVisited = [];

  for (let i = 0; i < rows; i++) {
    let visitedRow = [];
    let dfsVisitedRow = [];

    for (let j = 0; j < columns; j++) {
      visitedRow.push(false);
      dfsVisitedRow.push(false);
    }

    visited.push(visitedRow);
    dfsVisited.push(dfsVisitedRow);
  }

  let res = await dfsCycleDetectionTracePath(
    graphComponentMatrix,
    srcr,
    srcc,
    visited,
    dfsVisited
  );

  if (res) return Promise.resolve(true);

  return Promise.resolve(false);
}

async function dfsCycleDetectionTracePath(
  graphComponentMatrix,
  srcr,
  srcc,
  visited,
  dfsVisited
) {
  visited[srcr][srcc] = true;
  dfsVisited[srcr][srcc] = true;

  let cell = document.querySelector(
    `.cell[rowId="${srcr}"][columnId="${srcc}"]`
  );
  cell.style.backgroundColor = 'lightblue';
  await colorPromise();

  for (
    let children = 0;
    children < graphComponentMatrix[srcr][srcc].length;
    children++
  ) {
    let [crid, ccid] = graphComponentMatrix[srcr][srcc][children];
    if (!visited[crid][ccid]) {
      let res = await dfsCycleDetectionTracePath(
        graphComponentMatrix,
        crid,
        ccid,
        visited,
        dfsVisited
      );
      if (res) {
        cell.style.backgroundColor = 'transparent';
        await colorPromise();
        return Promise.resolve(true);
      }
    } else if (visited[crid][ccid] && dfsVisited[crid][ccid]) {
      let cyclicCell = document.querySelector(
        `.cell[rowId="${crid}"][columnId="${ccid}"]`
      );

      cyclicCell.style.backgroundColor = 'lightsalmon';
      await colorPromise();
      cyclicCell.style.backgroundColor = 'transparent';

      cell.style.backgroundColor = 'transparent';
      // await colorPromise();
      return Promise.resolve(true);
    }
  }
  cell.style.backgroundColor = 'transparent';
  dfsVisited[srcr][srcc] = false;
  return Promise.resolve(false);
}
