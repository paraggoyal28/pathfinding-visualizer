import { getUntraversedNeighbors } from "../../../utils/getUntraversedNeighbors";
import { dropFromQueue, isEqual } from "../../../utils/helpers";
import type { GridType, TileType } from "../../../utils/types";


export const dijkstra = (grid: GridType, startTile: TileType, endTile: TileType) => {

    const traversedTiles: TileType[] = []; // Initialize an array to store traversed tiles
    const base = grid[startTile.row][startTile.col]; // Get the start tile from the grid
    base.distance = 0; // Set the distance of the start tile to be 0
    base.isTraversed = true; // Mark the start tile as traversed
    const unTraversedTiles = [base]; // Initialize a queue with the start tile

    while (unTraversedTiles.length > 0) {
        // Continue while there are untraversed tiles
        unTraversedTiles.sort((a, b) => a.distance - b.distance); // Sort the queue by distance
        const currentTile = unTraversedTiles.shift(); // Remove the tile with the smallest distance
        if (currentTile) {
            // If current tile is valid
            if (currentTile.isWall) continue; // Skip if the tile is a wall
            if (currentTile.distance === Infinity) break; // Break if the tile is unreachable
            currentTile.isTraversed = true; // Mark the tile as traversed
            traversedTiles.push(currentTile); // Add the tile to the traversed tiles array

            if (isEqual(currentTile, endTile)) break; // Break if the tile is the end tile

            const neighbors = getUntraversedNeighbors(grid, currentTile); // Get untraversed neighbors
            for (let i = 0; i < neighbors.length; ++i) {
                // Iterate through each neighbor
                if (currentTile.distance + 1 < neighbors[i].distance) {
                    dropFromQueue(neighbors[i], unTraversedTiles); // Remove the neighbor from the queue
                    neighbors[i].distance = currentTile.distance + 1; // Set the distance of the neighbor
                    neighbors[i].parent = currentTile; // Set the previous tile of the neighbor
                    unTraversedTiles.push(neighbors[i]); // Add the neighbor to the queue
                }
            }
        }
    }

    const path = []; // Initialize an array to store the path
    let currentTile = grid[endTile.row][endTile.col]; // Set the current tile to the end tile
    while (currentTile !== null) {
        // Continue while the current tile is not null
        currentTile.isPath = true; // Mark the tile as part of the path
        path.unshift(currentTile); // Add the current tile to the path
        currentTile = currentTile.parent!; // Set the current tile to the parent of the current tile
    }
    return { traversedTiles, path }; // Return the path
}