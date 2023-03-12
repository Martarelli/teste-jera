import { useEffect, useState } from 'react';
import './App.css';
import sound from './timeover.mp3';

function App() {
  const [timePomodoro, setTimePomodoro] = useState( 25 );
  const [cicles, setCicles] = useState( 1 );
  const [totalTimeInSeconds, setTotalTimeInSeconds] = useState( timePomodoro * 60 );
  const [relaxTime, setRelaxTime] = useState(true);

  const minutes = Math.floor(totalTimeInSeconds / 60);
  const seconds = totalTimeInSeconds % 60;

  function playSound(){
    const audio = new Audio(sound);
    audio.currentTime = 0;
    audio.play(); 
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    setTimePomodoro(parseInt(data.time))
    alert("O tempo pomodoro será alterado no próximo ciclo...")

  }
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
          if(cicles % 4 === 0){
            setTotalTimeInSeconds( 10 * 60 );
          } else {
            setTotalTimeInSeconds( 5 * 60 );
          }
          setRelaxTime(false);
        } else {
          setCicles(cicles + 1);
          setTotalTimeInSeconds( timePomodoro * 60 );
          setRelaxTime(true)
        }
      }
    } else {
      setTimeout(() => {
        setTotalTimeInSeconds(totalTimeInSeconds - 1);
      }, 1000);
    }
  }, [totalTimeInSeconds, relaxTime, timePomodoro, cicles])

  return (
    <div className="App">
      <div className='timer-container'>
        <div>
          <span>Ciclos Pomodoro: {cicles}</span>
        </div>
        <div className='timer'>
          <span>{minutes.toString().padStart(2 , "0")}</span>
          <span>:</span>
          <span>{seconds.toString().padStart(2 , "0")}</span>
        </div>
        <form onSubmit={handlerSubmit}>
          <input type="number" name='time' placeholder='Escolhar um tempo Pomodoro para o próximo ciclo...' />
          <button type="submit">Alterar</button>
        </form>
      </div>
    </div>
  );
}

export default App;
