import type { GridType, TileType } from "../../../utils/types";

export const dfs = (grid: GridType, startTile: TileType, endTile: TileType) => {
    const traversedTiles: TileType[] = []; // Initialize the array to store traversed tiles
    const path: any[] = []; // Initialize the array to store the path

    return { traversedTiles, path };
}