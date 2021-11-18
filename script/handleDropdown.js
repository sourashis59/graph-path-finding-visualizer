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
    // if (e.target.classList.contains("dropdown")) {
    //     console.log("dropdown clicked");
    // }

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
    if (e.target.classList.contains("disabledButton")) return;

    selectedAlgo = e.target.id;

    switch (selectedAlgo) {
        case "BFS_BUTTON":
            resetStatus();

            selectAlgorithmButton.querySelector(".button").innerHTML = "BFS";
            document.querySelector("#detailText").innerHTML =
                "Breadth First Search : is unweighted search algorithm and guarantees shortest path  ";

            break;

        case "DFS_BUTTON":
            resetStatus();

            selectAlgorithmButton.querySelector(".button").innerHTML = "DFS";
            document.querySelector("#detailText").innerHTML =
                "Depth First Search : is unweighted search algorithm and does not guarantee shortest path  ";

            break;

        case "DIJKSTRA_BUTTON":
            resetStatus();

            selectAlgorithmButton.querySelector(".button").innerHTML =
                "Dijkstra";
            document.querySelector("#detailText").innerHTML =
                "Dijkstra's algorithm : is weighted search algorithm and guarantees shortest path  ";

            break;

        case "A_STAR_BUTTON":
            resetStatus();

            selectAlgorithmButton.querySelector(".button").innerHTML = "A*";
            document.querySelector("#detailText").innerHTML =
                "A* : is weighted search algorithm and guarantees shortest path in case of underestimate  ";

            break;

        case "GREEDY_BEST_FIRST_SEARCH_BUTTON":
            resetStatus();

            selectAlgorithmButton.querySelector(".button").innerHTML =
                "Greedy Best First Search";
            document.querySelector("#detailText").innerHTML =
                "Greedy Best First Search: is weighted search algorithm and DOES NOT guarantee shortest path";

            break;

        case "BIDIRECTIONAL_BFS_BUTTON":
            resetStatus();

            selectAlgorithmButton.querySelector(".button").innerHTML =
                "Bidirectional BFS";
            document.querySelector("#detailText").innerHTML =
                "Bidirectional BFS : is unweighted search algorithm and guarantees shortest path  ";

            break;

        case "BIDIRECTIONAL_GREEDY_BEST_FIRST_SEARCH_BUTTON":
            resetStatus();

            selectAlgorithmButton.querySelector(".button").innerHTML =
                "Bidirectional Greedy Best First Search";
            document.querySelector("#detailText").innerHTML =
                "Bidirectional Greedy Best First Search : is weighted search algorithm and does not guarantee shortest path  ";

            break;

        case "None":
            selectAlgorithmButton.querySelector(".button").innerHTML =
                "Select Algorithm :)";

            break;

        default:
            // alert("error in selecting algorithm");
            selectedAlgo = "None";

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

        case "recursiveDivisionMaze":
            recursiveDivisionMaze();

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
