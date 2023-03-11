import { useEffect, useState } from 'react';
import './App.css';
import sound from './timeover.mp3';

function App() {
  const [timePomodoro, setTimePomodoro] = useState( 2 );
  const [cicles, setCicles] = useState( 0 );
  const [totalTimeInSeconds, setTotalTimeInSeconds] = useState( timePomodoro * 60 );
  const [relaxTime, setRelaxTime] = useState(true);

  const minutes = Math.floor(totalTimeInSeconds / 60);
  const seconds = totalTimeInSeconds % 60;
  
  const setTime = () => {
    const value = document.getElementById('time-input').value;
    setTimePomodoro(value);
    setTotalTimeInSeconds( value * 60 );
    setRelaxTime(false);
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
          setCicles(setCicles + 1);
          setTotalTimeInSeconds( timePomodoro * 60 );
          setRelaxTime(true)
        }
      }
    } else {
      setTimeout(() => {
        setTotalTimeInSeconds(totalTimeInSeconds - 1);
      }, 1000);
    }
  }, [totalTimeInSeconds, relaxTime, timePomodoro])

  return (
    <div className="App">
      <div>
        <span>Ciclos Pomodoro: {cicles}</span>
      </div>
      <div className='timer'>
        <span>{minutes.toString().padStart(2 , "0")}</span>
        <span>:</span>
        <span>{seconds.toString().padStart(2 , "0")}</span>
      </div>
      <div className='timer-props'>
          <div className='time-div-inputs'>
            <label>Tempo Pomodoro: </label>
            <input id='time-input' type="number" step="1"/>
          </div>
          <button className='time-button' type="button" onClick={setTime}>Alterar</button>
      </div>
    </div>
  );
}

export default App;
