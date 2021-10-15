"use strict;";

// let dropdownButtonClicked = false;
// let dropdownContentActive = false;

let dropdownButtonContainers = document.querySelectorAll(
    ".dropdownButtonContainer"
);

let dropdownDivs = document.querySelectorAll(".dropdown");

let selectAlgorithmDropdown = document.querySelector(
    "#selectAlgorithmDropdown"
);

const generateMazeDropdown = document.querySelector("#generateMazeDropdown");

const selectAlgorithmButton = document.querySelector("#selectAlgorithmButton");

//*event handlers

function hideAllDropdownExceptGiven(givenDropdown) {
    for (let i = 0; i < dropdownDivs.length; i++) {
        if (dropdownDivs[i] !== givenDropdown)
            dropdownDivs[i].classList.add("hiddenDropdown");
    }
}

function handleDropdownButtonClick(e) {
    if (!e.target.classList.contains("disabledButton")) {
        e.stopPropagation();

        let butt = e.target;
        let dropdownContent = butt.parentNode.querySelector(".dropdown");
        // console.log(dropdownContent);

        hideAllDropdownExceptGiven(dropdownContent);

        dropdownContent.classList.toggle("hiddenDropdown");
    }
}

function handleWindowObjectClickDropdown(e) {
    console.log("window object clicked");

    if (e.target.classList.contains("dropdown")) {
        console.log("dropdown clicked");
    }

    for (let i = 0; i < dropdownButtonContainers.length; i++) {
        dropdownButtonContainers[i]
            .querySelector(".dropdown")
            .classList.add("hiddenDropdown");
    }

    // if (
    //     e.target.classList.contains("button") &&
    //     e.target.parentNode.classList.contains("dropdownButtonContainer")
    // ) {
    //     handleDropdownButtonClick(e);
    // }
}

function handleSelectAlgorithmDropdownClick(e) {
    // console.log(e.target.id);
    if (e.target.classList.contains("disabledButton")) return;

    selectedAlgo = e.target.id;

    switch (selectedAlgo) {
        case "BFS_BUTTON":
            resetStatus();

            selectAlgorithmButton.querySelector(".button").innerHTML = "BFS";
            break;

        case "DFS_BUTTON":
            resetStatus();

            selectAlgorithmButton.querySelector(".button").innerHTML = "DFS";
            break;

        case "DIJKSTRA_BUTTON":
            resetStatus();

            selectAlgorithmButton.querySelector(".button").innerHTML =
                "Dijkstra";
            break;

        case "A_STAR_BUTTON":
            resetStatus();

            selectAlgorithmButton.querySelector(".button").innerHTML = "A*";
            break;

        case "None":
            selectAlgorithmButton.querySelector(".button").innerHTML =
                "Select Algorithm";

            break;

        default:
            // alert("error in selecting algorithm");
            e.stopPropagation();

            break;
    }
}

function handleGenerateMazeDropdownClick(e) {
    if (e.target.classList.contains("disabledButton")) return;

    selectedMaze = e.target.id;

    switch (selectedMaze) {
        case "simpleRandomMaze":
            simpleRandomMaze();

            break;

        default:
            // alert("error in selecting algorithm");
            e.stopPropagation();

            break;
    }
}

//*event listners

window.addEventListener("click", handleWindowObjectClickDropdown);

for (let i = 0; i < dropdownButtonContainers.length; i++) {
    dropdownButtonContainers[i].firstElementChild.addEventListener(
        "click",
        handleDropdownButtonClick
    );
}

window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        handleWindowObjectClickDropdown(e);
    }
});

selectAlgorithmDropdown.addEventListener(
    "click",
    handleSelectAlgorithmDropdownClick
);

generateMazeDropdown.addEventListener("click", handleGenerateMazeDropdownClick);
