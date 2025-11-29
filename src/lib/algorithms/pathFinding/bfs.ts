import { getUntraversedNeighbors } from "../../../utils/getUntraversedNeighbors";
import { isEqual } from "../../../utils/helpers";
import { isInQueue } from "../../../utils/isInQueue";
import type { GridType, TileType } from "../../../utils/types";


export const bfs = (grid: GridType, startTile: TileType, endTile: TileType) => {
    const traversedTiles: TileType[] = []; // Initialize the array to store traversed tiles
    const base = grid[startTile.row][startTile.col]; // get the start tile from the grid
    base.distance = 0; // set the distance of the start tile to be 0
    base.isTraversed = true; // set the start tile to be traversed
    const unTraversed = [base]; // Initialize the array to store untraversed tiles

    while (unTraversed.length > 0) {
        // Continue while there are untraversed tiles
        const tile = unTraversed.shift() as TileType; // Get the first tile from the queue
        if (tile.isWall) continue; // Not process walled tiles
        if (tile.distance === Infinity) break; // break if the tile's distance is Infinity
        tile.isTraversed = true; // Mark the tile as traversed
        traversedTiles.push(tile); // Add the tile to the traversed tiles array
        if (isEqual(tile, endTile)) break; // break if the tile is the end tile

        const neighbors = getUntraversedNeighbors(grid, tile); // Get the untraversed neighbors of the tile
        for (const neighbor of neighbors) {
            // if the neighbor is not visited
            if (!isInQueue(neighbor, unTraversed)) {
                neighbor.distance = tile.distance + 1; // Update the distance of the neighbor
                neighbor.parent = tile; // Set the parent of the neighbor
                unTraversed.push(neighbor); // Add the neighbor to the queue
            }
        }
    }

    const path = []; // Initialize the array to store the path
    let tile = grid[endTile.row][endTile.col]; // Start from the end tile
    while (tile != null) {
        // Backtrack until the start tile
        tile.isPath = true; // Mark the tile as part of the path
        path.push(tile); // Add the tile to the path
        tile = tile.parent!; // Move to the parent tile
    }

    return { traversedTiles, path }; // Return the traversed tiles and the path
}