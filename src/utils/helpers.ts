import { MAX_COLS, MAX_ROWS } from "./constants";
import type { GridType, TileType } from "./types";

const createRow = (row: number, startTile: TileType, endTile: TileType): TileType[] => {
    const currentRow: TileType[] = [];
    for (let col = 0; col < MAX_COLS; col++) {
        currentRow.push({
            row,
            col,
            isEnd: row === endTile.row && col === endTile.col,
            isWall: false,
            isPath: false,
            distance: Infinity,
            isStart: row === startTile.row && col === startTile.col,
            isTraversed: false,
            parent: null,
        });
    }
    return currentRow;
}

export const createGrid = (startTile: TileType, endTile: TileType): GridType => {
    const grid: GridType = [];
    for (let row = 0; row < MAX_ROWS; row++) {
        grid.push(createRow(row, startTile, endTile));
    }
    return grid;
}

export const checkIfStartOrEnd = (row: Number, col: Number) => {
    return (
        (row === 1 && col === 1) || (row === MAX_ROWS - 1 && col === MAX_COLS - 1)
    );
};

export const createNewGrid = (grid: GridType, row: Number, col: Number) => {
    const newGrid = grid.slice();
    const newTile = {
        ...newGrid[row.valueOf()][col.valueOf()],
        isWall: !newGrid[row.valueOf()][col.valueOf()].isWall,
    };

    newGrid[row.valueOf()][col.valueOf()] = newTile;
    return newGrid;
};