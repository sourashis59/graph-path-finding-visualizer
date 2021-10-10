"use strict";

function changeCellStyle(cellDiv, newColor) {
    if (
        areRowColumnObjectsEqual(getRowColumn(cellDiv), sourceRowColumn) ||
        areRowColumnObjectsEqual(getRowColumn(cellDiv), destRowColumn)
    )
        return;

    let id = setTimeout(function () {
        cellDiv.style.backgroundColor = newColor;
    }, (netDelay += delayTime));

    timeOutIds.push(id);
}

function changeCellStyleWithoutDelay(cellDiv, newColor) {
    if (
        areRowColumnObjectsEqual(getRowColumn(cellDiv), sourceRowColumn) ||
        areRowColumnObjectsEqual(getRowColumn(cellDiv), destRowColumn)
    )
        return;

    let id = setTimeout(function () {
        cellDiv.style.backgroundColor = newColor;
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

    if (withDelay) changeCellStyle(cellDiv, enqueuedCellColor);
    else changeCellStyleWithoutDelay(cellDiv, enqueuedCellColor);
}

function cellInPathVisualize(cellDiv, withDelay = true) {
    let style = getComputedStyle(document.documentElement);

    const cellInPathColor = style.getPropertyValue("--cellInPathColor");

    if (withDelay) changeCellStyle(cellDiv, cellInPathColor);
    else changeCellStyleWithoutDelay(cellDiv, cellInPathColor);
}
