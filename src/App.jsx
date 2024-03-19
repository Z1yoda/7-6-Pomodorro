import './App.css'
import barchart from './assets/barchart.svg'
import whitecheck from './assets/whitecheck.svg'
import login from './assets/login.svg'
import setting from './assets/setting.svg'
import crown from './assets/crown.svg'
import threedots from './assets/threedots.svg'
import plus from './assets/plus.svg'
import caret from './assets/caret.svg'
import { useState, useEffect } from 'react'

function App() {
  const [minut, setMinut] = useState(0)
  const [second, setSecond] = useState(0)
  const [isWork, setIsWork] = useState(false)
  const [count, setCount] = useState(0)
  const [isActive, setIsActive] = useState(false)

  const [workMinut, setWorkMinut] = useState(1)

  useEffect(() => {
    setMinut(workMinut)
    setSecond(0)
  }, [])

  useEffect(() => {
    let interval
    if (isActive) {
      interval = setInterval(() => {
        if (second == 0) {
          setMinut(minut - 1)
          setSecond(59)
        } else {
          setSecond(second - 1)
        }
      }, 1000)
    }



    return () => clearInterval(interval)
  }, [minut, second, isActive, isWork])

  function timeFormat() {
    let str = ''
    if (minut < 10) {
      str = '0' + minut + ":";
    } else {
      str = minut + ":"
    }

    if (second < 10) {
      str += '0' + second
    } else {
      str += second
    }

    return str
  }

  function handleStart() {
    setIsActive(true)

    if (isActive) {
      setIsActive(false)
    }
  }



  return (
    <>
      <header className='container'>
        <div className="logo">
          <img src={whitecheck} alt="" />
          Pomofocus
        </div>
        <nav>
          <a href=""><li> <img src={barchart} alt="" /><p>Report</p></li></a>
          <a href=""><li> <img src={setting} alt="" /><p>Setting</p></li></a>
          <a href=""><li> <img src={login} alt="" /><p>Login</p></li></a>
          <a href=""><li> <img src={crown} alt="" /></li></a>
        </nav> </header>
      <div className="container">
        <div className="main-wrapper">
          <div className="line"></div>
          <div className="card-wrapper">
            <div className="buttons">
              <button>Pomodoro</button>
              <button>Short Break</button>
              <button>Long Break</button>
            </div>
            <div className="time">
              <h1>{timeFormat()}</h1>
            </div>
            <div className="btn-wrapper">
              <button className='startBtn' style={isActive ? { backgroundColor: "white", color: "#a44e4e" } : { backgroundColor: "#a44e4e", color: "white" }} onClick={handleStart}>{isActive ? "PAUSE" : "START"}</button>
              <span style={isActive ? { opacity: "1" } : { opacity: "0" }}><img src={caret} alt="" /></span>
            </div>
          </div>
          <div className="count-amount">
            <p>#1</p>
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
  )
}

export default App
