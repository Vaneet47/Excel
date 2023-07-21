// Storage -> 2D matrix to store the relationship
let graphComponentMatrix = [];

for (let i = 0; i < rows; i++) {
  let row = [];
  for (let j = 0; j < columns; j++) {
    // why array -> more than 1 child relationship
    row.push([]);
  }
  graphComponentMatrix.push(row);
}

function isGraphCyclic(graphComponentMatrix) {
  // dependency - visited, dfsVisited (2D array)
  // visited = [[false, false, ...26],[false, false, ...26],[false, false, ...26], ...100]
  let visited = []; // node visited trace
  let dfsVisited = []; // stack visited trace

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

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (!visited[i][j]) {
        let res = dfsCycleDetection(
          graphComponentMatrix,
          i,
          j,
          visited,
          dfsVisited
        );
        if (res) return true;
      }
    }
  }

  return false;
}

// Start -> visited(true); dfsVisited(true)
// End -> dfsVisited(false)
// if (visited[i][j] === true) already explored path, go back
// cycle detection condition ->
// if(visited[i][j] === true && dfsVisited[i][j] === true){
// cycle
//}
function dfsCycleDetection(
  graphComponentMatrix,
  srcr, // source row
  srcc, // source column
  visited,
  dfsVisited
) {
  visited[srcr][srcc] = true;
  dfsVisited[srcr][srcc] = true;

  // A1 -> [[0,1], [1,0],....]
  for (
    let children = 0;
    children < graphComponentMatrix[srcr][srcc].length;
    children++
  ) {
    let [crid, ccid] = graphComponentMatrix[srcr][srcc][children];
    if (!visited[crid][ccid]) {
      let res = dfsCycleDetection(
        graphComponentMatrix,
        crid,
        ccid,
        visited,
        dfsVisited
      );
      if (res) return true;
    } else if (visited[crid][ccid] && dfsVisited[crid][ccid]) {
      return true;
    }
  }

  dfsVisited[srcr][srcc] = false;
  return false;
}
