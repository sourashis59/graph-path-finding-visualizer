function Bidirectional_BFS_FindPath() {
    let visitedSource = make2DArray(rowSize, columnSize);
    let visitedDest = make2DArray(rowSize, columnSize);

    let parentSource = make2DArray(rowSize, columnSize);
    let parentDest = make2DArray(rowSize, columnSize);

    for (let i = 0; i < rowSize; i++) {
        for (let j = 0; j < columnSize; j++) {
            visitedSource[i][j] = false;
            visitedDest[i][j] = false;

            parentSource[i][j] = { row: -1, column: -1 };
            parentDest[i][j] = { row: -1, column: -1 };
        }
    }

    const qSource = new Queue();
    const qDest = new Queue();

    qSource.enqueue(sourceRowColumn);
    qDest.enqueue(destRowColumn);

    while (!qSource.isEmpty() || !qDest.isEmpty()) {
        if (!qSource.isEmpty()) {
            let uSource = qSource.dequeue();

            let { row: i, column: j } = uSource;

            // console.log(`dequeued : (${i} , ${j})`);
            visitedSource[i][j] = true;
            visitedCellVisualize(gridDiv[i][j]);

            if (areRowColumnObjectsEqual(uSource, destRowColumn))
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

            for (let k = 0; k < directions.length; k++) {
                let x = i + directions[k][0];
                let y = j + directions[k][1];

                let v = { row: x, column: y };

                if (
                    isSafe(x, y) &&
                    isCellEmpty(gridDiv[x][y]) &&
                    !visitedSource[x][y]
                ) {
                    visitedSource[x][y] = true;
                    parentSource[x][y] = uSource;

                    // console.log(`emqueued : (${x} , ${y})`);

                    qSource.enqueue(v);
                    enqueuedCellVisualize(gridDiv[x][y]);
                }
            }
        }

        if (!qDest.isEmpty()) {
            let uDest = qDest.dequeue();

            let { row: i, column: j } = uDest;

            // console.log(`dequeued : (${i} , ${j})`);
            visitedDest[i][j] = true;
            visitedCellVisualize(gridDiv[i][j]);

            if (areRowColumnObjectsEqual(uDest, sourceRowColumn))
                return {
                    destFound: true,
                    parentSource: parentSource,
                    parentDest: parentDest,
                    meetingPoint: { row: i, column: j },
                };

            if (visitedSource[i][j]) {
                return {
                    destFound: true,
                    parentSource: parentSource,
                    parentDest: parentDest,
                    meetingPoint: { row: i, column: j },
                };
            }

            for (let k = 0; k < directions.length; k++) {
                let x = i + directions[k][0];
                let y = j + directions[k][1];

                let v = { row: x, column: y };

                if (
                    isSafe(x, y) &&
                    isCellEmpty(gridDiv[x][y]) &&
                    !visitedDest[x][y]
                ) {
                    visitedDest[x][y] = true;
                    parentDest[x][y] = uDest;

                    // console.log(`emqueued : (${x} , ${y})`);

                    qDest.enqueue(v);
                    enqueuedCellVisualize(gridDiv[x][y]);
                }
            }
        }
    }

    return { destFound: false, parent: parent };
}
