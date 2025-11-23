import { createContext, useState, type ReactNode } from "react";
import type { TileType } from "../utils/types";
import { END_TILE_CONFIGURATION, START_TILE_CONFIGURATION } from "../utils/constants";


interface ITileContext {
    startTile: TileType,
    setStartTile: (startTile: TileType) => void,
    endTile: TileType,
    setEndTile: (endTile: TileType) => void,
}

export const TileContext = createContext<ITileContext | undefined>(undefined);

export const TileProvider = ({ children }: { children: ReactNode }) => {
    const [startTile, setStartTile] = useState<TileType>(START_TILE_CONFIGURATION);
    const [endTile, setEndTile] = useState<TileType>(END_TILE_CONFIGURATION);

    return (
        <TileContext.Provider
            value={{
                startTile,
                setStartTile,
                endTile,
                setEndTile,
            }}
        >
            {children}
        </TileContext.Provider>
    )
}