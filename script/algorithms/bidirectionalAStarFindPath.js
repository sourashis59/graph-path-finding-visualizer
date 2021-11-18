function BIDIRECTIONAL_A_STAR_FindPath() {
    console.log("A* function called");

    let visitedSource = make2DArray(rowSize, columnSize);
    let parentSource = make2DArray(rowSize, columnSize);

    let visitedDest = make2DArray(rowSize, columnSize);
    let parentDest = make2DArray(rowSize, columnSize);

    let distanceSource = make2DArray(rowSize, columnSize);
    let distanceDest = make2DArray(rowSize, columnSize);

    for (let i = 0; i < rowSize; i++) {
        for (let j = 0; j < columnSize; j++) {
            visitedSource[i][j] = false;
            visitedDest[i][j] = false;

            parentSource[i][j] = { row: -1, column: -1 };
            parentDest[i][j] = { row: -1, column: -1 };

            distanceSource[i][j] = Infinity;
            distanceDest[i][j] = Infinity;
        }
    }

    parentSource[sourceRowColumn.row][sourceRowColumn.column] = {
        row: -1,
        column: -1,
    };
    parentDest[sourceRowColumn.row][sourceRowColumn.column] = {
        row: -1,
        column: -1,
    };

    distanceSource[sourceRowColumn.row][sourceRowColumn.column] = 0;
    distanceDest[destRowColumn.row][destRowColumn.column] = 0;

    const minPQSource = new PriorityQueue(comparatorAStarPriorityQueue);
    const minPQDest = new PriorityQueue(comparatorAStarPriorityQueue);

    minPQSource.push({
        row: sourceRowColumn.row,
        column: sourceRowColumn.column,
        f_val: 0 + getHeuristic(sourceRowColumn, destRowColumn),
    });
    minPQDest.push({
        row: destRowColumn.row,
        column: destRowColumn.column,
        f_val: getHeuristic(destRowColumn, sourceRowColumn),
    });

    while (!minPQSource.isEmpty() && !minPQDest.isEmpty()) {
        if (!minPQSource.isEmpty()) {
            let u = minPQSource.pop();

            let { row: i, column: j } = u;

            if (visitedSource[i][j]) continue;

            visitedSource[i][j] = true;
            visitedCellVisualize(gridDiv[i][j]);

            if (areRowColumnObjectsEqual({ row: i, column: j }, destRowColumn))
                return {
                    destFound: true,
                    parentSource: parentSource,
                    parentDest: parentDest,
                    meetingPoint: { row: i, column: j },
                    totalCost: distanceSource[i][j] + distanceDest[i][j],
                };

            if (visitedDest[i][j])
                return {
                    destFound: true,
                    parentSource: parentSource,
                    parentDest: parentDest,
                    meetingPoint: { row: i, column: j },
                    totalCost: distanceSource[i][j] + distanceDest[i][j],
                };

            //*relaxation
            for (let k = 0; k < directions.length; k++) {
                let x = i + directions[k][0];
                let y = j + directions[k][1];

                if (isSafe(x, y)) {
                    let newDist = distanceSource[i][j] + getWeight(x, y);

                    if (!isCellBlocked(gridDiv[x][y]) && !visitedSource[x][y]) {
                        if (newDist < distanceSource[x][y]) {
                            parentSource[x][y] = { row: i, column: j };
                            distanceSource[x][y] = newDist;
                            // console.log(`emqueued : (${x} , ${y})`);

                            let newEstimatedDistance =
                                distanceSource[x][y] +
                                getHeuristic(
                                    { row: x, column: y },
                                    destRowColumn
                                );

                            let v = {
                                row: x,
                                column: y,
                                f_val: newEstimatedDistance,
                            };

                            minPQSource.push(v);
                            enqueuedCellVisualize(gridDiv[x][y]);
                        }
                    }
                }
            }
        }

        if (!minPQDest.isEmpty()) {
            let u = minPQDest.pop();

            let { row: i, column: j } = u;

            if (visitedDest[i][j]) continue;

            visitedDest[i][j] = true;
            visitedCellVisualize(gridDiv[i][j]);

            if (
                areRowColumnObjectsEqual({ row: i, column: j }, sourceRowColumn)
            )
                return {
                    destFound: true,
                    parentSource: parentSource,
                    parentDest: parentDest,
                    meetingPoint: { row: i, column: j },
                    totalCost: distanceSource[i][j] + distanceDest[i][j],
                };

            if (visitedSource[i][j])
                return {
                    destFound: true,
                    parentSource: parentSource,
                    parentDest: parentDest,
                    meetingPoint: { row: i, column: j },
                    totalCost: distanceSource[i][j] + distanceDest[i][j],
                };

            //*relaxation
            for (let k = 0; k < directions.length; k++) {
                let x = i + directions[k][0];
                let y = j + directions[k][1];

                if (isSafe(x, y)) {
                    let newDist = distanceDest[i][j] + getWeight(x, y);

                    if (!isCellBlocked(gridDiv[x][y]) && !visitedDest[x][y]) {
                        if (newDist < distanceDest[x][y]) {
                            parentDest[x][y] = { row: i, column: j };
                            distanceDest[x][y] = newDist;
                            // console.log(`emqueued : (${x} , ${y})`);

                            let newEstimatedDistance =
                                distanceDest[x][y] +
                                getHeuristic(
                                    { row: x, column: y },
                                    sourceRowColumn
                                );

                            let v = {
                                row: x,
                                column: y,
                                f_val: newEstimatedDistance,
                            };

                            minPQDest.push(v);
                            enqueuedCellVisualize(gridDiv[x][y]);
                        }
                    }
                }
            }
        }
    }

    return { destFound: false, parent: parent };

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //*Helper function definitions:

    function getWeight(i, j) {
        if (
            gridVal[i][j] === emptyCellVal ||
            gridVal[i][j] === sourceCellVal ||
            gridVal[i][j] === destCellVal
        )
            return 1;
        else return Number(gridVal[i][j]);
    }

    function getHeuristic(sourceRowColumn, destRowColumn) {
        return (
            Math.abs(sourceRowColumn.row - destRowColumn.row) +
            Math.abs(sourceRowColumn.column - destRowColumn.column)
        );
    }

    function comparatorAStarPriorityQueue(a, b) {
        return a.f_val <= b.f_val;
    }
}
