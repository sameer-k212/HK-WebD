import { useState, useContext } from "react"
import {CountContext} from "./Context.jsx"

function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <CountContext.Provider value={{count, setCount}}>  {/* wrape any one who want teliported value */}
        <Count/>      
      </CountContext.Provider> 
    </div>     
  )
}


function Count() {       

  return <div>                             
    <CountReader />                 
    <Buttons/>
  </div>
}

function CountReader(){
  const {count} = useContext(CountContext);
  return <div>{count}</div>
}

function Buttons() {   
  const {count, setCount} = useContext(CountContext); 

  return (
  <>
  <button onClick={() => setCount(count - 1)}>desc</button>
  <button onClick={() => setCount(count + 1)}>inc</button>
  </>
  )
}

export default App;