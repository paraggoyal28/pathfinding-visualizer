import { getUntraversedNeighbors } from "../../../utils/getUntraversedNeighbors";
import { checkStack, isEqual } from "../../../utils/helpers";
import type { GridType, TileType } from "../../../utils/types";

export const dfs = (grid: GridType, startTile: TileType, endTile: TileType) => {
    const traversedTiles = []; // Initialize the arry to store traversed tiles
    const base = grid[startTile.row][startTile.col]; // Get the start tile from the grid
    base.distance = 0; // Set the distance of the start tile to be 0
    base.isTraversed = true; // Mark the start tile as traversed
    const untraversedTiles = [base]; // Initialize the stack with start tile

    while (untraversedTiles.length > 0) {
        const currentTile = untraversedTiles.pop(); // Get the last tile from the stack
        if (currentTile) {
            // If the current tile is valid
            if (currentTile.isWall) continue; // Skip if the tile is wall 
            if (currentTile.distance === Infinity) break; // Break if the tile's distance is Infinity
            currentTile.isTraversed = true; // mark the tile as traversed
            traversedTiles.push(currentTile); // Add the tile to the traversed tiles array
            if (isEqual(currentTile, endTile)) break; // Break if the tile is end tile
            const neighbors = getUntraversedNeighbors(grid, currentTile); // Get untraversed neighbors
            for (let i = 0; i < neighbors.length; ++i) {
                // Iterate through each neighbor
                if (!checkStack(neighbors[i], untraversedTiles)) {
                    // Check if the neighbor not in stack
                    neighbors[i].distance = currentTile.distance + 1; // update the neighbor's distance
                    neighbors[i].parent = currentTile; // Set the neighbor's parent to the current tile 
                    untraversedTiles.push(neighbors[i]); // Push the neighbor to the stack
                }
            }
        }
    }
    const path = []; // Initialize the path array
    let currentTile = grid[endTile.row][endTile.col]; // Set the current tile to the end tile
    while (currentTile !== null) {
        // Iterate through the path
        currentTile.isPath = true; // Mark the tile as path
        path.unshift(currentTile); // Add the current tile to the path
        currentTile = currentTile.parent!; // Set the current tile to the parent tile
    }
    return { traversedTiles, path }; // Return the path
}