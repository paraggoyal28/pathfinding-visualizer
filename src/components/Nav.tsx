import { usePathFinding } from "../hooks/usePathFinding";
import { MAZES } from "../utils/constants";
import type { MazeType } from "../utils/types";
import { Select } from "./Select";

export function Nav({
    isVisualizetionRunningRef,
}: {
    isVisualizetionRunningRef: React.MutableRefObject<boolean>;
}) {
    const { maze } = usePathFinding();

    const handleGenerateMaze = (maze: MazeType) => {
        if (maze === "NONE") {
            //  setMaze(maze);
            //   resetGrid({ grid, startTile, endTile });

        }
    }

    return (
        <div className="flex justify-center items-center min-h-[4.5rem] border-b shadow-gray-600 sm:px-5 px-0">
            <div className="flex items-center lg:justify-between justify-center w-full sm:w-[52rem]">
                <h1 className="lg:flex hidden w-[40%] text-2xl pl-1">
                    Pathfinding Visualizer
                </h1>
                <div className="flex sm:items-end items-center justify-start sm:justify-between sm:flex-row flex-col sm:space-y-0 space-y-3 sm:py-0 py-4 sm:space-x-4 space-x-0">
                    <Select
                        label="Maze"
                        value={maze}
                        options={MAZES}
                        //isDisabled={isDisabled}
                        onChange={(e) => [
                            // Handle generating maze

                        ]}
                    />
                </div>
            </div>
        </div>
    )
}