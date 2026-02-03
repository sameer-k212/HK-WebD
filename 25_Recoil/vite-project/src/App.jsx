import { countAtom } from './store/atom/count.jsx';
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <Count />
    </RecoilRoot>
  )
}

function Count() {
  return (
    <div>
      <CountReader />
      <Buttons />
    </div>
  )
}

function CountReader() {
  const count = useRecoilValue(countAtom);
  
  return <div>{count}</div>
}

function Buttons() {
  const [count, setCount] = useRecoilState(countAtom);

  return (
    <div>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}

export default App;