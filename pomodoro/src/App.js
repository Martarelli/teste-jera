import { useState } from 'react';
import './App.css';

function App() {
  //Definição do tempo inicial
  const [totalTimeInSeconds, setTotalTimeInSeconds] = useState( 25 * 60 );

  const minutes = Math.floor(totalTimeInSeconds / 60);
  return (
    <div className="App">

    </div>
  );
}

export default App;
