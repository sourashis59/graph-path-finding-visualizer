//*variable declarations____________________________________________________

const findPathButton = document.querySelector("#findPathButton");

const resetButton = document.querySelector("#resetButton");

const canBeDisabledButtons = document.querySelectorAll(".canBeDisabled");

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

//*Event listners______________________________________________________________

findPathButton.addEventListener("click", handleFindPathButtonClick);

resetButton.addEventListener("click", handleResetButton);

gridSizeInputElement.addEventListener("input", updateGridSize);
