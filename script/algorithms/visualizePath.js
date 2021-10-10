function visualizePath(parent, sourceRowColumn, destRowColumn) {
    if (areRowColumnObjectsEqual(sourceRowColumn, destRowColumn)) {
        return;
    } else if (
        areRowColumnObjectsEqual(
            parent[destRowColumn.row][destRowColumn.column],
            { row: -1, column: -1 }
        )
    ) {
        //no path exists
        return;
    } else {
        visualizePath(
            parent,
            sourceRowColumn,
            parent[destRowColumn.row][destRowColumn.column]
        );

        cellInPathVisualize(gridDiv[destRowColumn.row][destRowColumn.column]);
    }
}
