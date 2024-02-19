
import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({title, targetTime})
{
    const dialog = useRef();
    const timer = useRef();
 
    const [timeRemaining,setTimeremaining] = useState(targetTime*1000);
    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime*1000;
 
    if(timeRemaining <= 0){
        clearInterval(timer.current);
        
        dialog.current.open();
    }

    function handleReset(){
        setTimeremaining(targetTime*1000);
    }
    
    function handleStop()
    {
        dialog.current.open();
        clearInterval(timer.current);
    }
    
    
    function handleStart(){
        timer.current = setInterval(() => {
            setTimeremaining(prevTimeRemaining => prevTimeRemaining-10);
        },10);

    }

    return (
        <>
        <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} result="lost" onReset={handleReset}></ResultModal>
        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time">
            {targetTime} second{targetTime > 1 ? 's' : ''}
            </p>
            <button onClick={timerIsActive ? handleStop : handleStart}>
                {timerIsActive ? 'Stop' : 'Start'} Challenge
            </button>
            <p className={timerIsActive ? 'active' : undefined}>
            {timerIsActive ? 'Time is running...' : 'Timer inactive'}
            </p>
        </section>
        </>
    );
}