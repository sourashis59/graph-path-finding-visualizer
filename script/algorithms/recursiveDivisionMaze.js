function recursiveDivisionMaze() {
    clearBlockedCells();

    let minWidth = (minHeight = 3);

    let topLeftCell = { row: 0, column: 0 };
    let bottomRightCell = { row: rowSize - 1, column: columnSize - 1 };
    recursiveDivisionMaze_helper(topLeftCell, bottomRightCell, "vertical");

    //*_____________________________________________NESTED FUNCTION DEFINITIONS___________________________________________

    function getWidth(topLeftCell, bottomRightCell) {
        return bottomRightCell.column - topLeftCell.column + 1;
    }

    function getHeight(topLeftCell, bottomRightCell) {
        return bottomRightCell.row - topLeftCell.row + 1;
    }

    function recursiveDivisionMaze_helper(
        topLeftCell,
        bottomRightCell,
        direction
    ) {
        let x1 = topLeftCell.row,
            y1 = topLeftCell.column;
        let x2 = bottomRightCell.row,
            y2 = bottomRightCell.column;

        if (
            getHeight(topLeftCell, bottomRightCell) <= 3 ||
            getHeight(topLeftCell, bottomRightCell) <= 3
        )
            return;

        if (
            getHeight(topLeftCell, bottomRightCell) < minHeight &&
            getHeight(topLeftCell, bottomRightCell) < minWidth
        )
            return;

        let midRow = Math.floor((x1 + x2) / 2);
        if (midRow === sourceRowColumn.row || midRow === destRowColumn.row)
            midRow++;

        let midColumn = Math.floor((y1 + y2) / 2);
        if (
            midColumn === sourceRowColumn.column ||
            midColumn === destRowColumn.column
        )
            midColumn++;

        let subGrid1TopLeft, subGrid1BottomRight;
        let subGrid2TopLeft, subGrid2BottomRight;

        if (direction === "vertical") {
            let emptyCellHasBeenPut = false;

            for (let i = x1; i <= x2; i++) {
                if (!emptyCellHasBeenPut && getRandomInt(0, 6) === 1) {
                    makeCellEmpty(gridDiv[i][midColumn]);
                    if (i + 1 <= x2) {
                        makeCellEmpty(gridDiv[i + 1][midColumn]);
                        i++;
                    } else if (i - 1 >= x1)
                        makeCellEmpty(gridDiv[i - 1][midColumn]);

                    emptyCellHasBeenPut = true;
                } else {
                    makeCellBlocked(gridDiv[i][midColumn]);
                }
            }

            if (!emptyCellHasBeenPut) {
                makeCellEmpty(gridDiv[x2][midColumn]);
                if (x2 - 1 >= x1) makeCellEmpty(gridDiv[x2 - 1][midColumn]);
            }

            subGrid1TopLeft = { row: x1, column: y1 };
            subGrid1BottomRight = { row: x2, column: midColumn - 1 };

            subGrid2TopLeft = { row: x1, column: midColumn + 1 };
            subGrid2BottomRight = { row: x2, column: y2 };
        } else if (direction === "horizontal") {
            let emptyCellHasBeenPut = false;

            for (let j = y1; j <= y2; j++) {
                if (!emptyCellHasBeenPut && getRandomInt(0, 10) === 1) {
                    makeCellEmpty(gridDiv[midRow][j]);

                    if (j + 1 <= y2) {
                        makeCellEmpty(gridDiv[midRow][j + 1]);
                        j++;
                    } else if (j - 1 >= y1)
                        makeCellEmpty(gridDiv[midRow][j - 1]);
                    emptyCellHasBeenPut = true;
                } else {
                    makeCellBlocked(gridDiv[midRow][j]);
                }
            }

            if (!emptyCellHasBeenPut) {
                makeCellEmpty(gridDiv[midRow][y2]);

                if (y2 - 1 >= y1) makeCellEmpty(gridDiv[midRow][y2 - 1]);
            }

            subGrid1TopLeft = { row: x1, column: y1 };
            subGrid1BottomRight = { row: midRow - 1, column: y2 };

            subGrid2TopLeft = { row: midRow + 1, column: y1 };
            subGrid2BottomRight = { row: x2, column: y2 };
        }

        let subGridDirection;
        if (
            getHeight(subGrid1TopLeft, subGrid1BottomRight) >
            getWidth(subGrid1TopLeft, subGrid1BottomRight)
        )
            subGridDirection = "horizontal";
        else subGridDirection = "vertical";

        recursiveDivisionMaze_helper(
            subGrid1TopLeft,
            subGrid1BottomRight,
            subGridDirection
        );
        recursiveDivisionMaze_helper(
            subGrid2TopLeft,
            subGrid2BottomRight,
            subGridDirection
        );
    }
}
