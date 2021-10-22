"use strict";

const legendContainer = document.querySelector(".legendContainer");
const overlay = document.querySelector(".overlay");

const legendButton = document.querySelector("#legendButton");

const closeButton = document.querySelector("#crossButtonLegend");

//*event handlers_____________________________

function closeLegendModal() {
    legendContainer.classList.add("hidden");
    overlay.classList.add("hidden");
}

function openLegendModal() {
    legendContainer.classList.remove("hidden");
    overlay.classList.remove("hidden");
}
//*event listners_________________________

legendButton.addEventListener("click", function () {
    if (legendContainer.classList.contains("hidden")) openLegendModal();
    else closeLegendModal();
});

closeButton.addEventListener("click", closeLegendModal);

overlay.addEventListener("click", closeLegendModal);

document.addEventListener("keydown", function (e) {
    // console.log(e.key);

    if (e.key === "Escape" && !legendContainer.classList.contains("hidden")) {
        closeLegendModal();
    }
});
