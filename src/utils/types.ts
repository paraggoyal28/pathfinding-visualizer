export type AlgorithmType = "A*" | "Dijkstra" | "BFS" | "DFS";
export type MazeType = "NONE" | "BINARY_TREE" | "RECURSIVE_DIVISION";
export type TileType = {
    row: Number,
    col: Number,
    isEnd: boolean,
    isWall: boolean,
    isPath: boolean,
    distance: Number,
    isStart: boolean,
    isTraversed: boolean,
    parent: TileType | null,
}
export type GridType = TileType[][];

export type SpeedType = 2 | 1 | 0.5;


export interface MazeSelectType {
    name: string;
    value: MazeType;
}
