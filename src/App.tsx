import { useRef } from 'react'
import { PathFindingProvider } from './context/PathFindingContext'
import { TileProvider } from './context/TileContext'
import { SpeedProvider } from './context/SpeedContext'
import { Grid } from './components/Grid'
import { Nav } from './components/Nav'

function App() {

  const isVisualizationRunningRef = useRef<boolean>(false);

  return (
    <PathFindingProvider>
      <TileProvider>
        <SpeedProvider>
          <div className="h-screen w-screen flex flex-col bg-[#131416] text-white">
            <Nav isVisualizetionRunningRef={isVisualizationRunningRef} />
            <Grid isVisualizationRunningRef={isVisualizationRunningRef} />
          </div>
        </SpeedProvider>
      </TileProvider>
    </PathFindingProvider >
  )
}

export default App
