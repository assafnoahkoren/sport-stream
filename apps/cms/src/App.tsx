import '@mantine/core/styles.css';
import MantineLayer from "./base-layers/mantine-layer";
import Routing from "./base-layers/routing/routing";
import { ReactQueryLayer } from './base-layers/react-query-layer';


function App() {
  return (
    <ReactQueryLayer>
      <MantineLayer>
        <Routing />
      </MantineLayer>
    </ReactQueryLayer>
  )
}

export default App
