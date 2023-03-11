import { useState } from 'react';
import './App.css';

function App() {
  //Definição do tempo inicial
  const [totalTimeInSeconds, setTotalTimeInSeconds] = useState( 25 * 60 );

  const minutes = Math.floor(totalTimeInSeconds / 60);
  const seconds = totalTimeInSeconds % 60;
  return (
    <div className="App">
      <div className='timer'>
        <span>{minutes.toString().padStart(2 , "0")}</span>
        <span>:</span>
        <span>{seconds.toString().padStart(2 , "0")}</span>
      </div>
    </div>
  );
}

export default App;
