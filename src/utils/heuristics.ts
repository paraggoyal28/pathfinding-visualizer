import { MAX_COLS, MAX_ROWS } from "./constants";
import type { GridType, TileType } from "./types";


export const initHeuristicCost = (grid: GridType, endTile: TileType) => {
    const heuristicCost = []; // Initialize an empty array to store the heuristic cost
    for (let i = 0; i < MAX_ROWS; ++i) {
        const rowCost = [];
        for (let j = 0; j < MAX_COLS; ++j) {
            rowCost.push(retrieveHeuristicCost(grid[i][j], endTile));
        }
        heuristicCost.push(rowCost);
    }
    return heuristicCost;
}

const retrieveHeuristicCost = (currentTile: TileType, endTile: TileType): number => {
    const horizontalDistance = Math.abs(currentTile.row - endTile.row);
    const verticalDistance = Math.abs(currentTile.col - endTile.col);
    return horizontalDistance + verticalDistance;
}

export const initFunctionCost = () => {
    const functionCost = []; // Initialize the function cost array
    for (let i = 0; i < MAX_ROWS; ++i) {
        const rowCost = [];
        for (let j = 0; j < MAX_COLS; ++j) {
            rowCost.push(Infinity); // Set the initial function cost for each tile to be Infinity
        }
        functionCost.push(rowCost);
    }
    return functionCost;
}
