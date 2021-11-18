//*Variable declaration______________________________________________________________

const gridSizeInputElement = document.getElementById("gridSizeInput");
const speedInputElement = document.getElementById("speedInput");

let rowSize = Number(gridSizeInputElement.value);
let columnSize = Math.floor(rowSize * (15 / 7));

let pathFindingGoingOn = false;
let cellBlockToggleAllowed = true;

let delayTime = 7;
let netDelay = 0;
let timeOutIds = [];
let endPathFindingTimeOutID;

let selectedAlgo = "None";

//Directions we can move : up , down, left ,right
const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];

const gridContainer = document.querySelector(".gridContainer");
const gridTable = document.querySelector(".gridTable");

let mouseIsPressedForBlockingCell = false;
let mouseIsPressedForDraggingSource = false;
let mouseIsPressedForDraggingDest = false;
let prevSourceCellDiv;
let prevDestCellDiv;

//will get value when drawBoard() is executed
let gridCellList = [];

let gridVal = make2DArray(rowSize, columnSize);
let gridDiv = make2DArray(rowSize, columnSize);
const rowColumnOfCellDiv = new Map();

let sourceRowColumn;
let destRowColumn;

const blockedCellVal = "blockedCell";
const emptyCellVal = "emptyCell";
const sourceCellVal = "sourceCell";
const destCellVal = "destCell";

//*Call drawBoard() function at the beginning

drawGrids();

//*function_________________________________________________________________________

function drawGrids() {
    console.log("drawGrid() called");

    resetAll();

    gridTable.innerHTML = "";

    for (let i = 0; i < rowSize; i++) {
        let currRowDiv = document.createElement("tr");

        gridTable.appendChild(currRowDiv);

        currRowDiv.classList.add("gridRow");

        for (let j = 0; j < columnSize; j++) {
            let currCellDiv = document.createElement("td");

            currRowDiv.appendChild(currCellDiv);
            currCellDiv.classList.add("gridCell");
            currCellDiv.classList.add("emptyCell");

            currCellDiv.classList.add(`row-${i}`);
            currCellDiv.classList.add(`column-${j}`);

            gridDiv[i][j] = currCellDiv;
            gridVal[i][j] = emptyCellVal;
        }
    }

    sourceRowColumn = getSourceRowColumn();
    let { row: sourceRow, column: sourceColumn } = sourceRowColumn;

    destRowColumn = getDestinationRowColumn();
    let { row: destRow, column: destColumn } = destRowColumn;

    //set source and destination_____________________________________
    gridDiv[sourceRow][sourceColumn].classList.add("sourceCell");
    gridDiv[destRow][destColumn].classList.add("destCell");

    gridVal[sourceRow][sourceColumn] = sourceCellVal;
    gridVal[destRow][destColumn] = destCellVal;
    //set source and destination_____________________________________

    //*Add event listners to each cell :)
    addBlockCellEventListners();

    //*add drag and drop event listners to source and destination cells

    // gridDiv[sourceRow][sourceColumn].addEventListener(
    //     "mouseup",
    //     handleSourceCellMouseUp
    // );
}

function addBlockCellEventListners() {
    for (let i = 0; i < rowSize; i++) {
        for (let j = 0; j < columnSize; j++) {
            //*Toggle Cell block _______________________________________________________________
            gridDiv[i][j].addEventListener(
                "mousedown",
                handleGridCellOnMouseDown
            );

            gridDiv[i][j].addEventListener(
                "mouseenter",
                handleGridCellMouseEnter
            );

            gridDiv[i][j].addEventListener("mouseup", handleGridCellOnMouseUp);
            //*Toggle Cell block _______________________________________________________________

            //*Source Cell deag and drop_______________________________________________________________________________________________________
            gridDiv[i][j].addEventListener(
                "mousedown",
                handleSourceCellDragAndDropMouseDown
            );
            gridDiv[i][j].addEventListener(
                "mouseenter",
                handleSourceCellDragAndDropMouseEnter
            );
            gridDiv[i][j].addEventListener(
                "mouseup",
                handleSourceCellDragAndDropMouseUp
            );
            //*Source Cell deag and drop_______________________________________________________________________________________________________

            //*Dest Cell deag and drop_________________________________________________________
            gridDiv[i][j].addEventListener(
                "mousedown",
                handleDestCellDragAndDropMouseDown
            );
            gridDiv[i][j].addEventListener(
                "mouseenter",
                handleDestCellDragAndDropMouseEnter
            );
            gridDiv[i][j].addEventListener(
                "mouseup",
                handleDestCellDragAndDropMouseUp
            );
            //*Dest Cell deag and drop_________________________________________________________
        }
    }
}
function findPathFunction() {
    let returnedObj;

    if (selectedAlgo === "None") {
        updateStatus("algorithmNotSelected");
    } else if (!pathFindingGoingOn) {
        console.log("findPathFunction() started");

        pathFindingGoingOn = true;
        cellBlockToggleAllowed = false;
        disableButtons();

        switch (selectedAlgo) {
            case "BFS_BUTTON":
                updateStatus("findingPath");

                returnedObj = BFS_FindPath();
                break;

            case "DFS_BUTTON":
                updateStatus("findingPath");

                returnedObj = DFS_FindPath();
                break;

            case "DIJKSTRA_BUTTON":
                updateStatus("findingPath");

                returnedObj = DIJKSTRA_FindPath();
                break;

            case "A_STAR_BUTTON":
                updateStatus("findingPath");

                returnedObj = A_STAR_FindPath();
                break;

            case "GREEDY_BEST_FIRST_SEARCH_BUTTON":
                updateStatus("findingPath");

                returnedObj = GREEDY_BEST_FIRST_SEARCH_FindPath();
                break;

            case "BIDIRECTIONAL_BFS_BUTTON":
                updateStatus("findingPath");

                returnedObj = Bidirectional_BFS_FindPath();
                break;

            case "BIDIRECTIONAL_GREEDY_BEST_FIRST_SEARCH_BUTTON":
                updateStatus("findingPath");

                returnedObj = BIDIRECTIONAL_GREEDY_BEST_FIRST_SEARCH_FindPath();
                break;

            default:
                alert("error in selecting algorithm");
        }

        if (returnedObj.destFound) {
            if (
                selectedAlgo === "BIDIRECTIONAL_BFS_BUTTON" ||
                selectedAlgo === "BIDIRECTIONAL_GREEDY_BEST_FIRST_SEARCH_BUTTON"
            ) {
                visualizePath(
                    returnedObj.parentSource,
                    sourceRowColumn,
                    returnedObj.meetingPoint
                );

                visualizePath(
                    returnedObj.parentDest,
                    destRowColumn,
                    returnedObj.meetingPoint
                );
            } else
                visualizePath(
                    returnedObj.parent,
                    sourceRowColumn,
                    destRowColumn
                );

            updateStatus("pathFound");
        } else {
            console.log("dest not found");
            updateStatus("pathNotFound");
        }

        endPathFinding();
    }
}

//*event handlers________________________________________________________________________

function handleGridCellOnMouseDown(e) {
    let cellDiv = e.target;
    // console.log(`Mouse down on ${cellDiv} `);

    if (
        !isSourceCell(cellDiv) &&
        !isDestinationCell(cellDiv) &&
        cellBlockToggleAllowed
    ) {
        mouseIsPressedForBlockingCell = true;
        toggleCellBlock(cellDiv);
    }
}

function handleGridCellMouseEnter(e) {
    let cellDiv = e.target;

    if (!cellBlockToggleAllowed) cellDiv.style.cursor = "not-allowed";
    if (
        mouseIsPressedForBlockingCell &&
        !isSourceCell(cellDiv) &&
        !isDestinationCell(cellDiv) &&
        cellBlockToggleAllowed
    )
        toggleCellBlock(cellDiv);
}

function handleGridCellOnMouseUp(e) {
    let cell = e.target;
    // console.log(`Mouse up on ${cell} `);
    mouseIsPressedForBlockingCell = false;
}

function handleSourceCellDragAndDropMouseDown(e) {
    let cellDiv = e.target;

    if (isSourceCell(cellDiv) && cellBlockToggleAllowed) {
        console.log("source cell mouse down");

        mouseIsPressedForDraggingSource = true;
        prevSourceCellDiv = cellDiv;
    }
}

function handleSourceCellDragAndDropMouseEnter(e) {
    let cellDiv = e.target;

    // console.log("mouse entered source cell drag");

    if (mouseIsPressedForDraggingSource && cellBlockToggleAllowed) {
        // console.log(cellDiv);
        if (
            cellDiv.classList.contains("emptyCell") &&
            !cellDiv.classList.contains("destCell")
        ) {
            prevSourceCellDiv.classList.remove("sourceCell");

            cellDiv.classList.add("sourceCell");
            sourceRowColumn = getRowColumn(cellDiv);

            prevSourceCellDiv = cellDiv;
        } else {
            cellDiv.style.cursor = "no-drop";
        }
    }
}

function handleSourceCellDragAndDropMouseUp(e) {
    let cell = e.target;
    // console.log(`Mouse up on ${cell} `);
    mouseIsPressedForDraggingSource = false;
}

function handleDestCellDragAndDropMouseDown(e) {
    let cellDiv = e.target;

    if (isDestinationCell(cellDiv) && cellBlockToggleAllowed) {
        console.log("dest cell mouse down");

        mouseIsPressedForDraggingDest = true;
        prevDestCellDiv = cellDiv;
    }
}

function handleDestCellDragAndDropMouseEnter(e) {
    let cellDiv = e.target;

    // console.log("mouse entered dest cell drag");

    if (mouseIsPressedForDraggingDest && cellBlockToggleAllowed) {
        // console.log(cellDiv);
        if (
            cellDiv.classList.contains("emptyCell") &&
            !cellDiv.classList.contains("sourceCell")
        ) {
            prevDestCellDiv.classList.remove("destCell");

            cellDiv.classList.add("destCell");
            destRowColumn = getRowColumn(cellDiv);

            prevDestCellDiv = cellDiv;
        } else {
            cellDiv.style.cursor = "no-drop";
        }
    }
}

function handleDestCellDragAndDropMouseUp(e) {
    let cellDiv = e.target;
    // console.log(`Mouse up on ${cell} `);
    mouseIsPressedForDraggingDest = false;
}

//*event listners_______________________________________________________________________

//this is to remove bug from drag and drop feature of source and dest cell while clicking on reset button while dragging
window.addEventListener("click", function (e) {
    if (!e.target.classList.contains("gridCell")) {
        mouseIsPressedForDraggingDest = false;
        mouseIsPressedForDraggingSource = false;
    }
});
//*___________________________________________
