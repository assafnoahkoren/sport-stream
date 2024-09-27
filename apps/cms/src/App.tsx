import { greet } from "@sport-stream/common"
import { useEffect } from "react"

function App() {
  useEffect(() => {
    console.log(greet('asd'));
    
  }, [])
  return (
    <span className="text-xl font-900">
     Sport
    </span>
  )
}

export default App
