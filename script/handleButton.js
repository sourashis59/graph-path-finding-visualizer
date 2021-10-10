//*variable declarations____________________________________________________

const findPathButton = document.querySelector("#findPathButton");

const resetButton = document.querySelector("#resetButton");

const canBeDisabledButtons = document.querySelectorAll(".canBeDisabled");

//*Event handlers_____________________________________________________________

const handleFindPathButtonClick = function (e) {
    findPathFunction();
};

function handleResetButton() {
    console.log("reset button clicked");

    resetAll();
    drawGrids();
}

function handleDisabledButtonsMouseover(e) {
    let cellDiv = e.target;

    if (cellDiv.classList.contains("canBeDisabled") && pathFindingGoingOn)
        cellDiv.style.cursor = "not-allowed";
}

//*Event listners______________________________________________________________

findPathButton.addEventListener("click", handleFindPathButtonClick);

resetButton.addEventListener("click", handleResetButton);

gridSizeInputElement.addEventListener("input", updateGridSize);

for (let i = 0; i < canBeDisabledButtons.length; i++) {
    canBeDisabledButtons[i].addEventListener(
        "mouseover",
        handleDisabledButtonsMouseover
    );
}
