import { useEffect, useState } from 'react';
import './App.css';
import sound from './timeover.mp3';

function App() {
  const [totalTimeInSeconds, setTotalTimeInSeconds] = useState( 25 * 60 );
  const [relaxTime, setRelaxTime] = useState(true);

  const minutes = Math.floor(totalTimeInSeconds / 60);
  const seconds = totalTimeInSeconds % 60;
  
  function playSound(){
    const audio = new Audio(sound);
    audio.currentTime = 0;
    audio.play(); 
  };

  useEffect(() => {
    if(totalTimeInSeconds === 0){
      if(window.Notification && Notification.permission !== "denied"){
        Notification.requestPermission(function(status){
          new Notification("ALERTA",{
            body:"O tempo acabou!"
          })
        });
        playSound();
        if(relaxTime){
          setTotalTimeInSeconds( 5 * 60 );
          setRelaxTime(false);
        } else {
          setTotalTimeInSeconds( 25 * 60 );
          setRelaxTime(true)
        }
      }
    } else {
      setTimeout(() => {
        setTotalTimeInSeconds(totalTimeInSeconds - 1);
      }, 1000);
    }
  }, [totalTimeInSeconds, relaxTime])

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
