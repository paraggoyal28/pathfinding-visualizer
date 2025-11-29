import { MAX_COLS, MAX_ROWS } from "../../../utils/constants";
import { createWall } from "../../../utils/createWall";
import { destroyWall } from "../../../utils/destroyWall";
import { isEqual, sleep } from "../../../utils/helpers";
import type { GridType, SpeedType, TileType } from "../../../utils/types";

export const binaryTree = async (
    grid: GridType,
    startTile: TileType,
    endTile: TileType,
    setIsDisabled: (isDisabled: boolean) => void,
    speed: SpeedType
) => {
    createWall(startTile, endTile, speed); // Make initial wall setup
    await sleep(MAX_ROWS * MAX_COLS); // Wait for the wall to be created

    for (const row of grid) {
        for (const node of row) {
            if (node.row % 2 === 0 || node.col % 2 === 0) {
                if (!isEqual(node, startTile) || !isEqual(node, endTile)) {
                    node.isWall = true;
                }
            }
        }
    }


    for (let r = 1; r < MAX_ROWS; r += 2) {
        // Iterate through odd rows
        for (let c = 1; c < MAX_COLS; c += 2) {
            // Iterate through odd columns
            if (r === MAX_ROWS - 2 && c === MAX_COLS - 2) {
                // Skip the bottom-right corner
                continue;
            } else if (r === MAX_ROWS - 2) {
                // If its' last row, destory a wall to its right
                await destroyWall(grid, r, c, 1, speed);
            } else if (r === MAX_COLS - 2) {
                // If its' last col, destory a wall to its bottom
                await destroyWall(grid, r, c, 0, speed);
            } else {
                // otherwise, randomly destroy a wall to its right or bottom
                const direction = Math.random() < 0.5 ? 0 : 1;
                await destroyWall(grid, r, c, direction, speed);
            }
        }
    }
    setIsDisabled(false); // Re-enable the UI
}