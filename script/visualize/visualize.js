"use strict";

function changeCellStyle(
    cellDiv,
    newColor,
    borderRadius = "0%",
    opacity = "100%"
) {
    if (
        areRowColumnObjectsEqual(getRowColumn(cellDiv), sourceRowColumn) ||
        areRowColumnObjectsEqual(getRowColumn(cellDiv), destRowColumn)
    )
        return;

    let id = setTimeout(function () {
        cellDiv.style.backgroundColor = newColor;
        cellDiv.style.borderRadius = borderRadius;
        cellDiv.style.opacity = opacity;
    }, (netDelay += delayTime));

    timeOutIds.push(id);
}

function changeCellStyleWithoutDelay(
    cellDiv,
    newColor,
    borderRadius = "0%",
    opacity = "100%"
) {
    if (
        areRowColumnObjectsEqual(getRowColumn(cellDiv), sourceRowColumn) ||
        areRowColumnObjectsEqual(getRowColumn(cellDiv), destRowColumn)
    )
        return;

    let id = setTimeout(function () {
        cellDiv.style.backgroundColor = newColor;
        cellDiv.style.borderRadius = borderRadius;
        cellDiv.style.opacity = opacity;
    }, netDelay);

    timeOutIds.push(id);
}

function visitedCellVisualize(cellDiv, withDelay = true) {
    let style = getComputedStyle(document.documentElement);
    const visitedCellColor = style.getPropertyValue("--visitedCellColor");

    if (withDelay) changeCellStyle(cellDiv, visitedCellColor);
    else changeCellStyleWithoutDelay(cellDiv, visitedCellColor);
}

function enqueuedCellVisualize(cellDiv, withDelay = true) {
    let style = getComputedStyle(document.documentElement);

    const enqueuedCellColor = style.getPropertyValue("--enqueuedCell");

    if (withDelay) changeCellStyle(cellDiv, enqueuedCellColor, "30%", "70%");
    else changeCellStyleWithoutDelay(cellDiv, enqueuedCellColor, "30%", "70%");
}

function cellInPathVisualize(cellDiv, withDelay = true) {
    let style = getComputedStyle(document.documentElement);

    const cellInPathColor = style.getPropertyValue("--cellInPathColor");

    if (withDelay) changeCellStyle(cellDiv, cellInPathColor);
    else changeCellStyleWithoutDelay(cellDiv, cellInPathColor);
}
