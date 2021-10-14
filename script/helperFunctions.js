let statusImageContainer = document.querySelector(".statusImageContainer");
let statusText = document.querySelector("#statusText").innerHTML;

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

function resetStatus() {
    document.querySelector("#statusText").innerHTML = "Chilling";

    // console.log(statusImageContainer);

    let statusImageContainerChildren =
        statusImageContainer.querySelectorAll("img");

    // console.log(statusImageContainerChildren);

    for (let i = 0; i < statusImageContainerChildren.length; i++) {
        // console.log(statusImageContainerChildren[i]);

        statusImageContainerChildren[i].classList.add("hidden");
    }
}

function resetAll() {
    //Important to ignore bug : First priority is to clear the endPathFinding timout
    if (endPathFindingTimeOutID) clearTimeout(endPathFindingTimeOutID);

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

    resetStatus();

    buttonsAllowed = true;

    enableButtons();
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
    endPathFindingTimeOutID = setTimeout(function () {
        pathFindingGoingOn = false;
        console.log("path finding function finished");
    }, (netDelay += delayTime));
}

function updateStatus(status) {
    let id = setTimeout(
        function () {
            //*update status text and image

            let statusImageContainerChildren =
                statusImageContainer.querySelectorAll("img");

            resetStatus();

            switch (status) {
                case "pathFound":
                    document.querySelector("#statusText").innerHTML =
                        "Path Found :)";

                    for (
                        let i = 0;
                        i < statusImageContainerChildren.length;
                        i++
                    ) {
                        // console.log(statusImageContainerChildren[i]);

                        if (
                            statusImageContainerChildren[i].id ===
                            "pathFoundImage"
                        ) {
                            statusImageContainerChildren[i].classList.remove(
                                "hidden"
                            );
                            break;
                        }
                    }

                    break;

                case "pathNotFound":
                    document.querySelector("#statusText").innerHTML =
                        "Path NOT Found :(";

                    for (
                        let i = 0;
                        i < statusImageContainerChildren.length;
                        i++
                    ) {
                        // console.log(statusImageContainerChildren[i]);

                        if (
                            statusImageContainerChildren[i].id ===
                            "pathNotFoundImage"
                        ) {
                            statusImageContainerChildren[i].classList.remove(
                                "hidden"
                            );

                            let id1 = setTimeout(function () {
                                statusImageContainerChildren[i].classList.add(
                                    "hidden"
                                );
                            }, 7000);

                            break;
                        }
                    }

                    break;

                case "algorithmNotSelected":
                    document.querySelector("#statusText").innerHTML =
                        "Select an algorithm :|";

                    for (
                        let i = 0;
                        i < statusImageContainerChildren.length;
                        i++
                    ) {
                        // console.log(statusImageContainerChildren[i]);

                        if (
                            statusImageContainerChildren[i].id ===
                            "algorithmNotSelectedImage"
                        ) {
                            statusImageContainerChildren[i].classList.remove(
                                "hidden"
                            );
                            break;
                        }
                    }

                    break;

                case "findingPath":
                    document.querySelector("#statusText").innerHTML =
                        "Finding path...";

                    break;

                default:
                    alert("error in updating status");
            }

            console.log(statusText);
        },

        (netDelay += delayTime)
    );

    timeOutIds.push(id);
}

function disableButtons() {
    const canBeDisabledButtons = document.querySelectorAll(".canBeDisabled");

    for (let i = 0; i < canBeDisabledButtons.length; i++) {
        canBeDisabledButtons[i].classList.add("disabledButton");
        canBeDisabledButtons[i].disabled = true;
    }
}

function enableButtons() {
    const canBeDisabledButtons = document.querySelectorAll(".canBeDisabled");

    for (let i = 0; i < canBeDisabledButtons.length; i++) {
        canBeDisabledButtons[i].classList.remove("disabledButton");
        canBeDisabledButtons[i].disabled = false;
    }
}
