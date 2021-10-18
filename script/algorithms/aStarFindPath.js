function getWeight(i, j) {
    if (
        gridVal[i][j] === emptyCellVal ||
        gridVal[i][j] === sourceCellVal ||
        gridVal[i][j] === destCellVal
    )
        return 1;
    else return Number(gridVal[i][j]);
}

function getHeuristic(i, j) {
    return Math.abs(i - destRowColumn.row) + Math.abs(j - destRowColumn.column);
}

function comparatorAStarPriorityQueue(a, b) {
    return a.f_val <= b.f_val;
}

function A_STAR_FindPath() {
    console.log("A* function called");

    let visited = make2DArray(rowSize, columnSize);
    let parent = make2DArray(rowSize, columnSize);
    let distance = make2DArray(rowSize, columnSize);
    for (let i = 0; i < rowSize; i++) {
        for (let j = 0; j < columnSize; j++) {
            visited[i][j] = false;
            parent[i][j] = { row: -1, column: -1 };
            distance[i][j] = Infinity;
        }
    }

    parent[sourceRowColumn.row][sourceRowColumn.column] = {
        row: -1,
        column: -1,
    };
    distance[sourceRowColumn.row][sourceRowColumn.column] = 0;

    const minPQ = new PriorityQueue(comparatorAStarPriorityQueue);
    minPQ.push({
        row: sourceRowColumn.row,
        column: sourceRowColumn.column,
        f_val: 0 + getHeuristic(sourceRowColumn.row, sourceRowColumn.column),
    });

    while (!minPQ.isEmpty()) {
        let u = minPQ.pop();

        let { row: i, column: j } = u;

        if (visited[i][j]) continue;

        if (areRowColumnObjectsEqual({ row: i, column: j }, destRowColumn))
            return { destFound: true, parent: parent };

        visited[i][j] = true;
        visitedCellVisualize(gridDiv[i][j]);

        //*relaxation
        for (let k = 0; k < directions.length; k++) {
            let x = i + directions[k][0];
            let y = j + directions[k][1];

            if (isSafe(x, y)) {
                let newDist = distance[i][j] + getWeight(x, y);

                if (!isCellBlocked(gridDiv[x][y]) && !visited[x][y]) {
                    if (newDist < distance[x][y]) {
                        parent[x][y] = { row: i, column: j };
                        distance[x][y] = newDist;
                        // console.log(`emqueued : (${x} , ${y})`);

                        let newEstimatedDistance =
                            distance[x][y] + getHeuristic(x, y);

                        let v = {
                            row: x,
                            column: y,
                            f_val: newEstimatedDistance,
                        };

                        minPQ.push(v);
                        enqueuedCellVisualize(gridDiv[x][y]);
                    }
                }
            }
        }
    }

    return { destFound: false, parent: parent };
}
