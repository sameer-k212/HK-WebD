import { useState } from "react"

// prop-drilling..
function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
        <Count count={count} setCount={setCount}  />       
    </div>     
  )
}


function Count({count, setCount}) {       // do count component really need setCount?
  return <div>                            { /* but still we have to pass it down to pass it to buttons.
                                           whenever the state value changed, all the intermediate components also need to\
                                           rerender be updated, that's why prop drilling is replaced by context Api */ }
    {count}                          
    <Buttons setCount={setCount} count={count}/>
  </div>
}

function Buttons({setCount, count}) {    // here we need both count and setCount.
  return (
  <>
  <button onClick={() => setCount(count - 1)}>desc</button>
  <button onClick={() => setCount(count + 1)}>inc</button>
  </>
  )
}

export default App;