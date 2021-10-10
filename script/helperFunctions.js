function isSourceCell(cellDiv) {
    if (cellDiv.classList.contains("sourceCell")) return true;
    else return false;
}

function isDestinationCell(cellDiv) {
    if (cellDiv.classList.contains("destCell")) return true;
    else return false;
}

// function isSourceCell(rowNo, columnNo) {
//     if (gridDiv[rowNo][columnNo].classList.contains("sourceCell")) return true;
//     else return false;
// }

// function isDestinationCell(cellDiv) {
//     if (gridDiv[i][j].classList.contains("destCell")) return true;
//     else return false;
// }

function isSafe(x, y) {
    return x >= 0 && y >= 0 && x < rowSize && y < columnSize;
}

function isCellBlocked(cellDiv) {
    return cellDiv.classList.contains(blockedCellVal);
}

function isCellEmpty(cellDiv) {
    return cellDiv.classList.contains(emptyCellVal);
}

function areRowColumnObjectsEqual(ob1, ob2) {
    return ob1.row === ob2.row && ob1.column === ob2.column;
}

function getJSONStringFromRowColumnObj(rowColumnObj) {
    return `{"row":"${rowColumnObj.row}","column":"${rowColumnObj.column}"`;
}

function getRowColumnObjFromJSONString(JSONStr) {
    let row, column;

    let obj = JSON.parse(JSONStr);
    return { row: Number(obj.row), column: Number(obj.column) };
}

function make2DArray(rowSize, columnSize) {
    let arr = new Array(rowSize);
    for (let i = 0; i < rowSize; i++) {
        arr[i] = new Array(columnSize);
    }

    return arr;
}

function getRowColumn(cellDiv) {
    // return rowColumnOfCellDiv.get(cellDiv);

    let rowNo = -1;
    let columnNo = -1;

    for (let i = 0; i < cellDiv.classList.length; i++) {
        let currClass = cellDiv.classList[i];

        if (currClass.startsWith("row-")) {
            rowNo = Number(currClass.substring(4));
        } else if (currClass.startsWith("column-")) {
            columnNo = Number(currClass.substring(7));
        }
    }

    return { row: rowNo, column: columnNo };
}

function getSourceRowColumn() {
    let rowNo = Math.floor(rowSize / 2);
    let columnNo = Math.floor(columnSize / 3);

    return { row: rowNo, column: columnNo };
}

function getDestinationRowColumn() {
    let rowNo = Math.floor(rowSize / 2);
    let columnNo = Math.floor((2 * columnSize) / 3);

    return { row: rowNo, column: columnNo };
}

function makeCellBlocked(cellDiv) {
    if (!cellDiv.classList.contains("blockedCell")) {
        cellDiv.classList.remove("emptyCell");
        cellDiv.classList.add("blockedCell");

        let { row: i, column: j } = getRowColumn(cellDiv);

        // console.log(` i = ${i}  , j = ${j}`);
        gridVal[i][j] = blockedCellVal;
    }
}

function makeCellEmpty(cellDiv) {
    if (!cellDiv.classList.contains("emptyCell")) {
        cellDiv.classList.remove("blockedCell");
        cellDiv.classList.add("emptyCell");

        let { row: i, column: j } = getRowColumn(cellDiv);

        gridVal[i][j] = emptyCellVal;
    }
}
function toggleCellBlock(cellDiv) {
    if (cellDiv.classList.contains("blockedCell")) makeCellEmpty(cellDiv);
    else makeCellBlocked(cellDiv);
}

function resetDelayTime() {
    netDelay = 0;
}

function resetAll() {
    //clear timeouts
    for (let i = 0; i < timeOutIds.length; i++) clearTimeout(timeOutIds[i]);

    timeOutIds = [];

    for (let i = 0; i < gridCellList.length; i++) gridCellList.classList = [];

    gridCellList = [];
    gridVal = [];
    gridVal = make2DArray(rowSize, columnSize);
    gridDiv = [];
    gridDiv = make2DArray(rowSize, columnSize);

    resetDelayTime();

    mouseIsPressed = false;
    pathFindingGoingOn = false;
}

function updateGridSize() {
    rowSize = Number(gridSizeInputElement.value);
    columnSize = Math.floor(rowSize * (15 / 7));

    drawGrids();
}

function updateSpeed() {
    let speed = Number(speedInputElement.value);

    delayTime = 1000 / (speed * speed);
}

function endPathFinding() {
    let id = setTimeout(function () {
        pathFindingGoingOn = false;
        console.log("path finding function finished");
    }, (netDelay += delayTime));
}
