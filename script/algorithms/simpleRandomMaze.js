function simpleRandomMaze() {
    console.log("simple random maze function called");

    clearBlockedCells();

    for (let i = 0; i < rowSize; i++) {
        for (let j = 0; j < columnSize; j++) {
            if (
                !(i === sourceRowColumn.row && j === sourceRowColumn.column) &&
                !(i === destRowColumn.row && j === destRowColumn.column)
            ) {
                let x = getRandomInt(0, 6);

                if (x === 1 || x === 2) {
                    makeCellBlocked(gridDiv[i][j]);
                }
            }
        }
    }
}
