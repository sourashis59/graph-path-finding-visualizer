//*variable declarations____________________________________________________

const findPathButton = document.querySelector("#findPathButton");

const resetButton = document.querySelector("#resetButton");

const clearPathButton = document.querySelector("#clearPathButton");
const clearWallsButton = document.querySelector("#clearWallsButton");

const canBeDisabledButtons = document.querySelectorAll(".canBeDisabled");

const canBeEnabledWithoutResetButtons = document.querySelectorAll(
    ".canBeEnabledWithoutReset"
);

//*Event handlers_____________________________________________________________

const handleFindPathButtonClick = function (e) {
    if (!e.target.classList.contains("disabledButton")) {
        findPathFunction();
    }
};

function handleResetButton() {
    console.log("reset button clicked");

    resetAll();
    drawGrids();
}

function handleClearPathButton(e) {
    // console.log("Clear Path button clicked");

    if (!e.target.classList.contains("disabledButton")) {
        resetEmptyCells();
        enableButtons();
    }
}

function handleClearWallsButton(e) {
    if (!e.target.classList.contains("disabledButton")) {
        // console.log("Clear Walls button called");
        clearBlockedCells();
    }
}
//*Event listners______________________________________________________________

findPathButton.addEventListener("click", handleFindPathButtonClick);

resetButton.addEventListener("click", handleResetButton);

clearPathButton.addEventListener("click", handleClearPathButton);
clearWallsButton.addEventListener("click", handleClearWallsButton);

gridSizeInputElement.addEventListener("input", updateGridSize);
speedInputElement.addEventListener("input", updateSpeed);
