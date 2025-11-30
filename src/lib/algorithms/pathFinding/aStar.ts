import { getUntraversedNeighbors } from "../../../utils/getUntraversedNeighbors";
import { dropFromQueue, isEqual } from "../../../utils/helpers";
import { initFunctionCost, initHeuristicCost } from "../../../utils/heuristics";
import type { GridType, TileType } from "../../../utils/types";


export const aStar = (grid: GridType,
    startTile: TileType,
    endTile: TileType) => {

    const traversedTiles: TileType[] = []; // Store traversed tiles
    const heuristicCost = initHeuristicCost(grid, endTile); // Initialize the heuristic cost for each tile
    const functionCost = initFunctionCost(); // Initialize the function cost for each tile
    const base = grid[startTile.row][startTile.col]; // Get the start tile of the grid
    base.distance = 0;
    functionCost[base.row][base.col] =
        base.distance + heuristicCost[base.row][base.col]; // Calculate the function cost for the start tile
    base.isTraversed = true; // Mark the start tile as traversed

    const untraversedTiles = [base]; // Initialize the queue with start tile

    while (untraversedTiles.length > 0) {
        // Continue while there are untraversed tiles
        untraversedTiles.sort((a, b) => {
            // Sort the queue by function cost then the distance
            if (functionCost[a.row][a.col] === functionCost[b.row][b.col]) {
                // In a tie, choose the path which has made the most progress
                // so far, i.e, the one with the shortest heuristic distance
                // remaining
                return a.distance - b.distance;
            }
            return functionCost[a.row][a.col] - functionCost[b.row][b.col]; // Sort by function cost
        });

        const currentTile = untraversedTiles.shift(); // Get the tile with the lowest function cost

        console.log("** Current Tile ** " + currentTile);
        if (currentTile) {
            // if current tile is valid
            if (currentTile.isWall) continue; // skip the current tile if it is a wall
            if (currentTile.distance === Infinity) break; // Break if the tile's distance is Infinity
            currentTile.isTraversed = true; // Mark the tile as traversed
            traversedTiles.push(currentTile); // Add the tile to the traversed tiles

            if (isEqual(currentTile, endTile)) break; // Break if the current tile is the end tile

            const neighbors = getUntraversedNeighbors(grid, currentTile); // Get the untraversed neighbors of the current tile
            for (let i = 0; i < neighbors.length; ++i) {
                // Iterate through each neighbor
                const distanceToNeighbor = currentTile.distance + 1; // Calculate the distance to the neighbor

                if (distanceToNeighbor < neighbors[i].distance) {
                    // Check if shorter path is found
                    dropFromQueue(neighbors[i], untraversedTiles); // Remove the neighbor from the queue
                    neighbors[i].distance = distanceToNeighbor; // Update the neighbor's distance
                    neighbors[i].parent = currentTile; // Set the neighbor's parent to current tile
                    functionCost[neighbors[i].row][neighbors[i].col] =
                        neighbors[i].distance + heuristicCost[neighbors[i].row][neighbors[i].col]; // Update the neighbor's function cost
                    untraversedTiles.push(neighbors[i]); // Add the neighbor to the queue
                }
            }
        }
    }

    const path = []; // Initialize the path
    let currentTile = grid[endTile.row][endTile.col]; // Start from the end tile
    while (currentTile !== null) {
        // Iterate through the path
        currentTile.isPath = true; // Mark the tile as part of the path
        path.unshift(currentTile); // Add the current tile to the path
        currentTile = currentTile.parent!; // Move to the parent tile
    }

    return { traversedTiles, path };
}