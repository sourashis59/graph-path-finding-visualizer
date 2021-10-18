//*variable declarations____________________________________________________

const findPathButton = document.querySelector("#findPathButton");

const resetButton = document.querySelector("#resetButton");

const clearPathButton = document.querySelector("#clearPathButton");

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
    console.log("Clear Path button clicked");

    if (!e.target.classList.contains("disabledButton")) {
        resetEmptyCells();
        enableButtons();
    }
}

//*Event listners______________________________________________________________

findPathButton.addEventListener("click", handleFindPathButtonClick);

resetButton.addEventListener("click", handleResetButton);

clearPathButton.addEventListener("click", handleClearPathButton);

gridSizeInputElement.addEventListener("input", updateGridSize);
speedInputElement.addEventListener("input", updateSpeed);
