import { greet } from "@sport-stream/common"
import { useEffect } from "react"

import '@mantine/core/styles.css';
import MantineLayer from "./base-layers/mantine-layer";
import Routing from "./base-layers/routing/routing";

function App() {
  useEffect(() => {
    console.log(greet('asd'));

  }, [])
  return (
    <MantineLayer >
      <Routing />
    </MantineLayer>
  )
}

export default App
