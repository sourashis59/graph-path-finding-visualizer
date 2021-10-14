// window.onload = function () {
//     console.log("page loaded");

//     drawGrids();
// };

//*Variable declaration______________________________________________________________

const gridSizeInputElement = document.getElementById("gridSizeInput");
const speedInputElement = document.getElementById("speedInput");

let rowSize = Number(gridSizeInputElement.value);
let columnSize = Math.floor(rowSize * (15 / 7));

let pathFindingGoingOn = false;
let buttonsAllowed = true;

let delayTime = 10;
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

let mouseIsPressed = false;

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

    gridCellList = document.querySelectorAll(".gridCell");

    //*Add event listners to each cell :)

    for (let i = 0; i < gridCellList.length; i++) {
        // console.log(`Adding event listner to ${gridCellList[i]}`);

        //*Make a cell blocked or empty_________________________________________________________
        gridCellList[i].addEventListener(
            "mousedown",
            handleGridCellOnMouseDown
        );
        gridCellList[i].addEventListener(
            "mouseenter",
            handleGridCellMouseEnter
        );

        gridCellList[i].addEventListener("mouseup", handleGridCellOnMouseUp);
    }
}

function findPathFunction() {
    let returnedObj;

    if (selectedAlgo === "None") {
        updateStatus("algorithmNotSelected");
    } else if (!pathFindingGoingOn) {
        pathFindingGoingOn = true;
        buttonsAllowed = false;
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

            default:
                alert("error in selecting algorithm");
        }

        if (returnedObj.destFound) {
            visualizePath(returnedObj.parent, sourceRowColumn, destRowColumn);

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
    console.log(`Mouse down on ${cellDiv} `);

    mouseIsPressed = true;

    if (
        !isSourceCell(cellDiv) &&
        !isDestinationCell(cellDiv) &&
        !pathFindingGoingOn &&
        buttonsAllowed
    )
        toggleCellBlock(cellDiv);
}

function handleGridCellMouseEnter(e) {
    let cellDiv = e.target;

    if (pathFindingGoingOn) cellDiv.style.cursor = "not-allowed";
    if (
        mouseIsPressed &&
        !isSourceCell(cellDiv) &&
        !isDestinationCell(cellDiv) &&
        !pathFindingGoingOn &&
        buttonsAllowed
    )
        toggleCellBlock(cellDiv);
}

function handleGridCellOnMouseUp(e) {
    let cell = e.target;
    console.log(`Mouse up on ${cell} `);
    mouseIsPressed = false;
}

//*event listners_______________________________________________________________________

//*___________________________________________
