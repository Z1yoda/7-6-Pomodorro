import './App.css';
import barchart from './assets/barchart.svg';
import whitecheck from './assets/whitecheck.svg';
import login from './assets/login.svg';
import setting from './assets/setting.svg';
import crown from './assets/crown.svg';
import threedots from './assets/threedots.svg';
import plus from './assets/plus.svg';
import caret from './assets/caret.svg';
import { useState, useEffect } from 'react';

function App() {
  const [minute, setMinute] = useState(25);
  const [second, setSecond] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [count, setCount] = useState(0);
  const [workMinut, setWorkMinut] = useState(1)

  useEffect(() => {

    if (localStorage.getItem('count')) {
      const savedCount = parseInt(localStorage.getItem('count'));
      setCount(savedCount);
    }

    let interval;
    if (isActive) {
      interval = setInterval(() => {
        if (second === 0) {
          if (minute === 0) {
            clearInterval(interval);
            handleComplete();
          } else {
            setMinute(minute - 1);
            setSecond(59);
          }
        } else {
          setSecond(second - 1);
        }

      }, 1000);

    }

    if (minute == 0 && second == 0) {
      setCount(count + 1);
      localStorage.setItem('count', count);
    }

    return () => clearInterval(interval);
  }, [isActive, minute, second]);

  useEffect(() => {
    if (isBreak) {
      setMinute(5);
    } else {
      setMinute(workMinut);
    }
    setSecond(0);
  }, [isBreak]);

  function handleStart() {
    setIsActive(!isActive);
  };

  function handleComplete() {
    setIsActive(false);
    setIsBreak(!isBreak);
  };

  function handleReset() {
    setIsActive(false);
    setIsBreak(false);
    setMinute(workMinut);
    setSecond(0);
  };

  return (
    <>
      <header className='container'>
        <div className="logo">
          <img src={whitecheck} alt="" />
          Pomofocus
        </div>
        <nav>
          <a href="/"><li> <img src={barchart} alt="" /><p>Report</p></li></a>
          <a href="/"><li> <img src={setting} alt="" /><p>Setting</p></li></a>
          <a href="/"><li> <img src={login} alt="" /><p>Login</p></li></a>
          <a href="/"><li> <img src={crown} alt="" /></li></a>
        </nav>
      </header>
      <div className="container">
        <div className="main-wrapper">
          <div className="line"></div>
          <div className="card-wrapper">
            <div className="buttons">
              <button style={!isBreak ? { backgroundColor: "#a44e4e", fontWeight: "700" } : {}} onClick={() => setIsBreak(false)}>Pomodoro</button>
              <button style={isBreak ? { backgroundColor: "#a44e4e", fontWeight: "700" } : {}} onClick={() => setIsBreak(true)}>Short Break</button>
            </div>
            <div className="time">
              <h1>{minute < 10 ? `0${minute}` : minute}:{second < 10 ? `0${second}` : second}</h1>
            </div>
            <div className="btn-wrapper">
              <button className='startBtn' style={isActive ? { backgroundColor: "white", color: "#a44e4e" } : { backgroundColor: "#a44e4e", color: "white" }} onClick={handleStart}>{isActive ? "PAUSE" : "START"}</button>
              <img onClick={handleReset} src={caret} alt="" />
            </div>
          </div>
          <div className="count-amount">
            <p>#{count}</p>
            <h3>Time to focus!</h3>
          </div>
          <div className="card-wrapper tasks">
            <h4>Tasks</h4>
            <div className="threedots">
              <img src={threedots} alt="" />
            </div>
          </div>
          <div className="card-wrapper task-adding">
            <img src={plus} alt="" />
            <h5>Add Task</h5>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
