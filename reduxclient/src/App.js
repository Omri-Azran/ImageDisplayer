import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incremented, decremented, incrementByValue } from './features/paginator.slice';
function App() {

  const count = useSelector(state => state.paginator.value)
  const dispatch = useDispatch();

  const handleCount = () =>{
    dispatch(incrementByValue(5));
  }
  return (
    <div>
      <button onClick={handleCount}>
        count is: {count}
      </button>
    </div>
  );
}

export default App;
