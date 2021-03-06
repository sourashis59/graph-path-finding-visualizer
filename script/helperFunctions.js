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
    let columnNo = Math.floor(columnSize / 5);

    return { row: rowNo, column: columnNo };
}

function getDestinationRowColumn() {
    let rowNo = Math.floor(rowSize / 2);
    let columnNo = Math.floor((4 * columnSize) / 5);

    return { row: rowNo, column: columnNo };
}

function makeCellBlocked(cellDiv) {
    if (!cellDiv.classList.contains("blockedCell")) {
        cellDiv.classList.remove("emptyCell");
        cellDiv.classList.add("blockedCell");

        let { row: i, column: j } = getRowColumn(cellDiv);

        gridVal[i][j] = blockedCellVal;
    }
}

function makeCellEmpty(cellDiv) {
    let { row: i, column: j } = getRowColumn(cellDiv);

    if (!cellDiv.classList.contains("emptyCell")) {
        cellDiv.classList.remove("blockedCell");
        cellDiv.classList.add("emptyCell");
        gridVal[i][j] = emptyCellVal;
    }
}
function toggleCellBlock(cellDiv) {
    if (cellDiv.classList.contains("blockedCell")) makeCellEmpty(cellDiv);
    else makeCellBlocked(cellDiv);
}

function clearBlockedCells() {
    for (let i = 0; i < rowSize; i++) {
        for (let j = 0; j < columnSize; j++) {
            if (
                !(i === sourceRowColumn.row && j === sourceRowColumn.column) &&
                !(i === destRowColumn.row && j === destRowColumn.column)
            ) {
                makeCellEmpty(gridDiv[i][j]);
            }
        }
    }
}
function resetDelayTime() {
    netDelay = 0;
}

function resetTimeOuts() {
    //Important to ignore bug : First priority is to clear the endPathFinding timout
    if (endPathFindingTimeOutID) clearTimeout(endPathFindingTimeOutID);

    //clear timeouts
    for (let i = 0; i < timeOutIds.length; i++) clearTimeout(timeOutIds[i]);

    timeOutIds = [];
    resetDelayTime();
}

function resetStatus() {
    document.querySelector("#statusText").innerHTML = "Chilling";

    let statusImageContainerChildren =
        statusImageContainer.querySelectorAll("img");

    for (let i = 0; i < statusImageContainerChildren.length; i++) {
        statusImageContainerChildren[i].classList.add("hidden");
    }
}

function resetEmptyCells() {
    resetTimeOuts();
    resetStatus();

    cellBlockToggleAllowed = true;

    for (let i = 0; i < rowSize; i++) {
        for (let j = 0; j < columnSize; j++) {
            if (
                gridVal[i][j] !== blockedCellVal &&
                !gridDiv[i][j].classList.contains("blockedCell") &&
                !isSourceCell(gridDiv[i][j]) &&
                !isDestinationCell(gridDiv[i][j])
            ) {
                gridDiv[i][j].style.backgroundColor = "white";
                gridDiv[i][j].style.animation = "none";

                // let style = getComputedStyle(document.documentElement);
                // const borderColor = style.getPropertyValue(
                //     "--cellBcellBorderColor"
                // );

                // gridDiv[i][
                //     j
                // ].style.border = `border: 0.01rem solid ${borderColor}`;
            }
        }
    }
}

function resetAll() {
    resetTimeOuts();

    for (let i = 0; i < gridCellList.length; i++) gridCellList.classList = [];

    gridCellList = [];
    gridVal = [];
    gridVal = make2DArray(rowSize, columnSize);
    gridDiv = [];
    gridDiv = make2DArray(rowSize, columnSize);

    mouseIsPressed = false;
    pathFindingGoingOn = false;

    resetStatus();

    cellBlockToggleAllowed = true;

    enableButtons();
}

function updateGridSize() {
    rowSize = Number(gridSizeInputElement.value);
    columnSize = Math.floor(rowSize * (15 / 7));

    drawGrids();
}

function updateSpeed() {
    let speed = Number(speedInputElement.value);

    delayTime = 1000 / speed ** 1.5;
}

function endPathFinding() {
    endPathFindingTimeOutID = setTimeout(function () {
        pathFindingGoingOn = false;
        console.log("path finding function finished");

        enableButtonsWhichCanBeEnabledWithoutReset();
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

                            timeOutIds.push(id1);

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

function enableButtonsWhichCanBeEnabledWithoutReset() {
    const canBeEnabledWithoutResetButtons = document.querySelectorAll(
        ".canBeEnabledWithoutReset"
    );

    for (let i = 0; i < canBeEnabledWithoutResetButtons.length; i++) {
        canBeEnabledWithoutResetButtons[i].classList.remove("disabledButton");
        canBeEnabledWithoutResetButtons[i].disabled = false;
    }
}

//retuns random integer within range [lowRange, highRange)
const getRandomInt = function (lowRange, highRange) {
    let diff = highRange - lowRange;
    return lowRange + Math.floor(Math.random() * diff);
};
