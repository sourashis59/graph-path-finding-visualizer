function DIJKSTRA_FindPath() {
    console.log("Dijkstra function called");

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

    const minPQ = new PriorityQueue(comparatorDijkstraPriorityQueue);
    minPQ.push({
        row: sourceRowColumn.row,
        column: sourceRowColumn.column,
        distance: 0,
    });

    while (!minPQ.isEmpty()) {
        let u = minPQ.pop();

        let { row: i, column: j } = u;

        if (areRowColumnObjectsEqual({ row: i, column: j }, destRowColumn))
            return {
                destFound: true,
                parent: parent,
                totalCost: distance[i][j],
            };

        visited[i][j] = true;
        visitedCellVisualize(gridDiv[i][j]);

        //*relaxation
        for (let k = 0; k < directions.length; k++) {
            let x = i + directions[k][0];
            let y = j + directions[k][1];

            if (isSafe(x, y)) {
                let newDist = u.distance + getWeight(x, y);

                let v = { row: x, column: y, distance: newDist };

                if (!isCellBlocked(gridDiv[x][y]) && !visited[x][y]) {
                    if (newDist < distance[x][y]) {
                        parent[x][y] = { row: i, column: j };
                        distance[x][y] = newDist;
                        // console.log(`emqueued : (${x} , ${y})`);

                        minPQ.push(v);
                        enqueuedCellVisualize(gridDiv[x][y]);
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

    function comparatorDijkstraPriorityQueue(a, b) {
        return a.distance <= b.distance;
    }
}
