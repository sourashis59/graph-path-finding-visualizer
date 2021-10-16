"use strict";

function changeCellStyle(cellDiv, newColor, borderRadius = "0%") {
    if (
        areRowColumnObjectsEqual(getRowColumn(cellDiv), sourceRowColumn) ||
        areRowColumnObjectsEqual(getRowColumn(cellDiv), destRowColumn)
    )
        return;

    let id = setTimeout(function () {
        cellDiv.style.backgroundColor = newColor;
        cellDiv.style.borderRadius = borderRadius;
    }, (netDelay += delayTime));

    timeOutIds.push(id);
}

function changeCellStyleWithoutDelay(cellDiv, newColor, borderRadius = "0%") {
    if (
        areRowColumnObjectsEqual(getRowColumn(cellDiv), sourceRowColumn) ||
        areRowColumnObjectsEqual(getRowColumn(cellDiv), destRowColumn)
    )
        return;

    let id = setTimeout(function () {
        cellDiv.style.backgroundColor = newColor;
        cellDiv.style.borderRadius = borderRadius;
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

    if (withDelay) changeCellStyle(cellDiv, enqueuedCellColor, "50%");
    else changeCellStyleWithoutDelay(cellDiv, enqueuedCellColor, "50%");
}

function cellInPathVisualize(cellDiv, withDelay = true) {
    let style = getComputedStyle(document.documentElement);

    const cellInPathColor = style.getPropertyValue("--cellInPathColor");

    if (withDelay) changeCellStyle(cellDiv, cellInPathColor);
    else changeCellStyleWithoutDelay(cellDiv, cellInPathColor);
}
