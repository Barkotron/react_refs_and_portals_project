
import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({title, targetTime})
{
    const dialog = useRef();
    const timer = useRef();
    const [timerStarted, setTimerStarted] = useState(false);
    const [timerExpired, setTimerExpired] = useState(false);

 
    
    function handleStop()
    {
        clearTimeout(timer.current);
    }
    
    
    function handleStart(){
        timer.current = setTimeout(() => {
            setTimerExpired(true);
            dialog.current.open();
        }, targetTime*1000);

        setTimerStarted(true);
    }

    return (
        <>
        <ResultModal ref={dialog} targetTime={targetTime} result="lost"></ResultModal>
        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time">
            {targetTime} second{targetTime > 1 ? 's' : ''}
            </p>
            <button onClick={timerStarted ? handleStop : handleStart}>
                {timerStarted ? 'Stop' : 'Start'} Challenge
            </button>
            <p className={timerStarted ? 'active' : undefined}>
            {timerStarted ? 'Time is running...' : 'Timer inactive'}
            </p>
        </section>
        </>
    );
}