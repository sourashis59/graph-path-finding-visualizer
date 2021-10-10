function BFS_FindPath() {
    let visited = make2DArray(rowSize, columnSize);
    let parent = make2DArray(rowSize, columnSize);
    for (let i = 0; i < rowSize; i++) {
        for (let j = 0; j < columnSize; j++) {
            visited[i][j] = false;
            parent[i][j] = { row: -1, column: -1 };
        }
    }

    const q = new Queue();

    q.enqueue(sourceRowColumn);

    while (!q.isEmpty()) {
        let u = q.dequeue();

        let { row: i, column: j } = u;

        // console.log(`dequeued : (${i} , ${j})`);

        if (areRowColumnObjectsEqual(u, destRowColumn))
            return { destFound: true, parent: parent };

        visited[i][j] = true;
        visitedCellVisualize(gridDiv[i][j]);

        for (let k = 0; k < directions.length; k++) {
            let x = i + directions[k][0];
            let y = j + directions[k][1];

            let v = { row: x, column: y };

            if (isSafe(x, y) && isCellEmpty(gridDiv[x][y]) && !visited[x][y]) {
                visited[x][y] = true;
                parent[x][y] = u;

                // console.log(`emqueued : (${x} , ${y})`);

                q.enqueue(v);
                enqueuedCellVisualize(gridDiv[x][y]);
            }
        }
    }

    return { destFound: false, parent: parent };
}
