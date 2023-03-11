import { useEffect, useState } from 'react';
import './App.css';
import sound from './timeover.mp3';

function App() {

  let timePomodoro = 25;

  const [totalTimeInSeconds, setTotalTimeInSeconds] = useState( timePomodoro * 60 );
  const [relaxTime, setRelaxTime] = useState(true);

  const minutes = Math.floor(totalTimeInSeconds / 60);
  const seconds = totalTimeInSeconds % 60;
  
  function setTimePomodoro(){
    
  }
  function playSound(){
    const audio = new Audio(sound);
    audio.currentTime = 0;
    audio.play(); 
  };

  useEffect(() => {
    if(totalTimeInSeconds === 0){
      if(window.Notification && Notification.permission !== "denied"){
        Notification.requestPermission(function(status){
          if(relaxTime){
            new Notification("ALERTA",{
              body:"Começou o tempo de descanso!"
            })
          } else {
            new Notification("ALERTA",{
              body:"Acabou o tempo de descanso!"
            })
          }
        });
        playSound();
        if(relaxTime){
          setTotalTimeInSeconds( 5 * 60 );
          setRelaxTime(false);
        } else {
          setTotalTimeInSeconds( timePomodoro * 60 );
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
      <div className='timer-props'>
        <form action="{}">
          <div className='time-div-inputs'>
            <label className='time-label'>Tempo Pomodoro: </label>
            <input className='time-input' type="number" step="1" />
          </div>
          <button className='time-button' type="submit">Alterar</button>
        </form>
      </div>
    </div>
  );
}

export default App;
