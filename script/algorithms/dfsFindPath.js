function DFS_FindPath() {
    console.log("DFS function called");

    let visited = make2DArray(rowSize, columnSize);
    let parent = make2DArray(rowSize, columnSize);
    for (let i = 0; i < rowSize; i++) {
        for (let j = 0; j < columnSize; j++) {
            visited[i][j] = false;
            parent[i][j] = { row: -1, column: -1 };
        }
    }

    let destFound = DFS_helper(sourceRowColumn, destRowColumn, visited, parent);

    if (destFound) return { destFound: true, parent: parent };
    else return { destFound: false, parent: parent };

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

    function DFS_helper(sourceRowColumn, destRowColumn, visited, parent) {
        // if (visited[sourceRowColumn.row][sourceRowColumn.column]) return false;

        let i = sourceRowColumn.row,
            j = sourceRowColumn.column;

        visited[i][j] = true;
        visitedCellVisualize(gridDiv[i][j]);

        if (areRowColumnObjectsEqual(sourceRowColumn, destRowColumn))
            return true;

        for (let k = 0; k < directions.length; k++) {
            let x = i + directions[k][0];
            let y = j + directions[k][1];

            let v = { row: x, column: y };

            if (isSafe(x, y) && isCellEmpty(gridDiv[x][y]) && !visited[x][y]) {
                parent[x][y] = sourceRowColumn;

                if (DFS_helper(v, destRowColumn, visited, parent)) return true;
            }
        }

        return false;
    }
}
