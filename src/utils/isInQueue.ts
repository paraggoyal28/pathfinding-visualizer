import type { TileType } from "./types";

export function isInQueue(tile: TileType, queue: TileType[]) {
    for (let visitedTile of queue) {
        if (visitedTile.row === tile.row && visitedTile.col === tile.col) {
            return true;
        }
    }
    return false;
}