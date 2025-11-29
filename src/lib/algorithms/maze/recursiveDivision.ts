import type { GridType, SpeedType, TileType } from "../../../utils/types";
import { horizontalDivision } from "./horizontalDivision";
import { verticalDivision } from "./verticalDivision";



export default async function recursiveDivision({
    grid,
    startTile,
    endTile,
    row,
    col,
    height,
    width,
    setIsDisabled,
    speed
}: {
    grid: GridType;
    startTile: TileType;
    endTile: TileType;
    row: number;
    col: number;
    height: number;
    width: number;
    setIsDisabled: (isDisabled: boolean) => void;
    speed: SpeedType;
}) {
    if (height <= 1 || width <= 1) {
        return; // Base Case: if the section is too small, stop recursion
    }

    if (height > width) {
        await horizontalDivision({
            // Divide horizontally if height is greater than width
            grid,
            startTile,
            endTile,
            row,
            col,
            height,
            width,
            setIsDisabled,
            speed
        });
    } else {
        await verticalDivision({
            // Divide vertically if width is greater than height
            grid,
            startTile,
            endTile,
            row,
            col,
            height,
            width,
            setIsDisabled,
            speed
        });
    }
}
