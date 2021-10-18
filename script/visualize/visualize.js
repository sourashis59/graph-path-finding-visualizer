"use strict";

function changeCellStyle(
    cellDiv,
    newColor,
    argumentDelayTime = delayTime,
    argumentAnimationID = `none`
) {
    if (
        areRowColumnObjectsEqual(getRowColumn(cellDiv), sourceRowColumn) ||
        areRowColumnObjectsEqual(getRowColumn(cellDiv), destRowColumn)
    )
        return;

    let id = setTimeout(function () {
        cellDiv.style.backgroundColor = newColor;

        // cellDiv.style.transition = `background-color 0.7s`;

        cellDiv.style.animation = `${argumentAnimationID} ${
            argumentDelayTime * 15
        }ms linear forwards`;
    }, (netDelay += argumentDelayTime));

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

    if (withDelay)
        changeCellStyle(
            cellDiv,
            visitedCellColor,
            delayTime,
            "gridCellVisitedAnimation"
        );
    else changeCellStyleWithoutDelay(cellDiv, visitedCellColor);
}

function enqueuedCellVisualize(cellDiv, withDelay = true) {
    let style = getComputedStyle(document.documentElement);

    const enqueuedCellColor = style.getPropertyValue("--enqueuedCell");

    if (withDelay)
        changeCellStyle(
            cellDiv,
            enqueuedCellColor,
            delayTime,
            `gridCellEnqueueAnimation`
        );
    else
        changeCellStyleWithoutDelay(
            cellDiv,
            enqueuedCellColor,
            `gridCellEnqueueAnimation`
        );
}

function cellInPathVisualize(cellDiv, withDelay = true) {
    let style = getComputedStyle(document.documentElement);

    const cellInPathColor = style.getPropertyValue("--cellInPathColor");

    if (withDelay)
        changeCellStyle(
            cellDiv,
            cellInPathColor,
            delayTime * 4,
            "gridCellPathAnimation"
        );
    else changeCellStyleWithoutDelay(cellDiv, cellInPathColor);
}
