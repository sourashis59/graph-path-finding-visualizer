function BIDIRECTIONAL_GREEDY_BEST_FIRST_SEARCH_FindPath() {
    console.log("Greedy Best First Search function called");

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

    const minPQSource = new PriorityQueue(comparatorGreedyBFSPriorityQueue);
    const minPQDest = new PriorityQueue(comparatorGreedyBFSPriorityQueue);

    minPQSource.push({
        row: sourceRowColumn.row,
        column: sourceRowColumn.column,
        h_val: getHeuristic(sourceRowColumn, destRowColumn),
    });
    minPQDest.push({
        row: destRowColumn.row,
        column: destRowColumn.column,
        h_val: getHeuristic(destRowColumn, sourceRowColumn),
    });

    while (!minPQSource.isEmpty() && !minPQDest.isEmpty()) {
        if (!minPQSource.isEmpty()) {
            let u = minPQSource.pop();

            let { row: i, column: j } = u;

            visitedSource[i][j] = true;
            visitedCellVisualize(gridDiv[i][j]);

            if (areRowColumnObjectsEqual({ row: i, column: j }, destRowColumn))
                return {
                    destFound: true,
                    parentSource: parentSource,
                    parentDest: parentDest,
                    meetingPoint: { row: i, column: j },
                };

            if (visitedDest[i][j])
                return {
                    destFound: true,
                    parentSource: parentSource,
                    parentDest: parentDest,
                    meetingPoint: { row: i, column: j },
                };

            //*relaxation
            for (let k = 0; k < directions.length; k++) {
                let x = i + directions[k][0];
                let y = j + directions[k][1];

                if (isSafe(x, y)) {
                    let newDist =
                        distanceSource[u.row][u.column] + getWeight(x, y);

                    if (!isCellBlocked(gridDiv[x][y]) && !visitedSource[x][y]) {
                        if (newDist < distanceSource[x][y]) {
                            parentSource[x][y] = { row: i, column: j };
                            distanceSource[x][y] = newDist;
                            // console.log(`emqueued : (${x} , ${y})`);

                            let v = {
                                row: x,
                                column: y,
                                h_val: getHeuristic(
                                    { row: x, column: y },
                                    destRowColumn
                                ),
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
                };

            if (visitedSource[i][j])
                return {
                    destFound: true,
                    parentSource: parentSource,
                    parentDest: parentDest,
                    meetingPoint: { row: i, column: j },
                };

            //*relaxation
            for (let k = 0; k < directions.length; k++) {
                let x = i + directions[k][0];
                let y = j + directions[k][1];

                if (isSafe(x, y)) {
                    let newDist =
                        distanceDest[u.row][u.column] + getWeight(x, y);

                    if (!isCellBlocked(gridDiv[x][y]) && !visitedDest[x][y]) {
                        if (newDist < distanceDest[x][y]) {
                            parentDest[x][y] = { row: i, column: j };
                            distanceDest[x][y] = newDist;
                            // console.log(`emqueued : (${x} , ${y})`);

                            let v = {
                                row: x,
                                column: y,
                                h_val: getHeuristic(
                                    { row: x, column: y },
                                    sourceRowColumn
                                ),
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

    //*function definitions_______________________________________________________________________________________________

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

    function comparatorGreedyBFSPriorityQueue(a, b) {
        return a.h_val <= b.h_val;
    }
}
