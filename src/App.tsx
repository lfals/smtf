import { useEffect, useState } from 'react'
import { useCountdownTimer } from 'use-countdown-timer';
import { ipcRenderer } from 'electron';
import {Worktime} from './view';
import sendNotification from '../renderer.js'

function App() {
  const [count, setCount] = useState(0)
  const { countdown, start, reset, pause, isRunning } = useCountdownTimer({
    timer: 1000 * 1500,
  });


  const checkStatus = () => {
    if(!isRunning){
      sendNotification()
    }
  }

  useEffect(() => {
    checkStatus()
  }, [countdown])




  return (
    <>
    {isRunning ? (
      <>
      <Worktime title="Working b!*tch" timer={countdown} action={pause} actionName="Pause"/>
      </>
    ) : (
      <>
     <Worktime title="Stand, please"  timer={countdown} action={start} actionName="start"/>
    </>
    )}
  </>
  )
}

export default App
