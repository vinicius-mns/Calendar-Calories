/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState, useEffect} from 'react';
import images from './images'; 

function CalorieTracker () {
  const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun']
  const [state, setState] = useState([])
  const [visible, setVisible] = useState(false)
  const [dayID, setDayID] = useState(null)
  const [exercise, setExercise] = useState(null)
  const [emoji, setEmoji] = useState(null)
  const [block, setBlock] = useState (true)
  const [modalReset, setModalReset] = useState(false)
  const [modalResetOne, setModalResetOne] = useState(false)
  const [tempID, setTemID] = useState('')

  const december = ['x','x',1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,
  17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,'x','x']

  function handle({target:{id}}){
    setVisible(true)
    setDayID(id - 1)
  }

  function confirm(){
    const storage = JSON.parse(localStorage.getItem('december_calendar_tracker'))
   
    storage.splice(dayID + 1, 1, [emoji,exercise])


    localStorage.setItem('december_calendar_tracker', JSON.stringify(storage))
    setState(storage)
    setVisible(false)
    setExercise(null)
    setEmoji(null)
    setBlock(true)
  }

  function resetOne({target:{id}}) {
    setTemID(id)
    setModalResetOne(true)
    // const storage = JSON.parse(localStorage.getItem('december_calendar_tracker'))

    // storage.splice(id, 1, id-1)
    // localStorage.setItem('december_calendar_tracker', JSON.stringify(storage))
    // setState(storage)
  }

  
  function verify() {
    const calendar = JSON.parse(localStorage.getItem('december_calendar_tracker'))

    if(calendar === null) {
      localStorage.setItem('december_calendar_tracker', JSON.stringify(december))
      setState(JSON.parse(localStorage.getItem('december_calendar_tracker')))
    } else {
      setState(JSON.parse(localStorage.getItem('december_calendar_tracker')))
    }
  }

  function selectEmoji({target}) {
    setEmoji(target.id)
  }

  function handleExercise({target}) {
    setExercise(target.innerText)
  }

  function close() {
    setVisible(false)
  }
  
  function yes() {
    localStorage.setItem('december_calendar_tracker', JSON.stringify(december))
    setState(JSON.parse(localStorage.getItem('december_calendar_tracker')))
    setModalReset(false)
  }

  function sim() {
    const storage = JSON.parse(localStorage.getItem('december_calendar_tracker'))

    storage.splice(tempID, 1, tempID - 1)
    localStorage.setItem('december_calendar_tracker', JSON.stringify(storage))
    setState(storage)
    setModalResetOne(false)
  }

  function no() {
    setModalReset(false)
  }
  
  function reset() {
    setModalReset(true)
  }

  function model() {
    return(
      <div className="modal" >
        <h3>Day: { dayID }</h3>
        <p onClick={close}>X</p>
        <div className="calories_day">
          <h3>Calories day</h3>
          <div className="carousel">
            {Object.entries(images).map((array) => (
              <button id={array[1][0]} onClick={selectEmoji}>
                <img src={array[1][0]} alt={array[0]}/> {array[1][1]}
              </button>
            ))}
          </div>
        </div>

        <div className="exercises">
          <h3>Exercises</h3>
          <div>
            <button onClick={handleExercise}>Yes</button>
            <button onClick={handleExercise}>No</button>
          </div>
        </div>
        <button disabled={block} className="confirm" onClick={confirm}>Confirm</button>
      </div>
    )
  }

  useEffect(() => {
    verify()
  },[])

  useEffect(() => {
    console.log('exercise', exercise)
    console.log('emoji', emoji)

    if(emoji !== null  && exercise !== null) {
      setBlock(false)
    }
  }, [exercise, emoji])

  function modalResetF() {
   return (
      <div className="genericModal">
        <h3>Tem certeza que quer apagar tudo?</h3>
        <div>
          <button onClick={yes}>Sim</button>
          <button onClick={no}>Não</button>
        </div>
      </div>
    )
  }

  function nao() {
    setModalResetOne(false)
  }

  function modalResetOneF() {
    return (
       <div className="genericModal">
         <h3>Tem certeza que quer apagar o dia <strong>{tempID - 1}</strong>?</h3>
         <div>
           <button onClick={sim}>Sim</button>
           <button onClick={nao}>Não</button>
         </div>
       </div>
     )
   }

  return(
    <main className="main">
      { visible && model() }
      { modalReset && modalResetF()}
      {modalResetOne && modalResetOneF()}
      <header>
        <h1>Calories Tracker</h1>
      </header>

      <div className="title"><h2 onClick={reset}>December</h2> <button>Reset</button></div>
      <div className="calendar">
        <div className="weekDays">{ DAYS_OF_WEEK.map((weekDay) => <span>{weekDay}</span> ) }</div>

        <div className="days" onClick={handle} onTouchMove={resetOne}>
          {state.map((day,index) => <div id={index}>{ typeof(day) === 'object' ? <img id={index} src={day[0]} className={day[1]} alt=""/> : day }</div>)}
        </div>
      </div>
      <div className="tabelinha">
        <div className="table">
          {Object.entries(images).map((array) => (
             <div> <img src={array[1][0]} alt={array[0]} />{array[1][1]}</div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default CalorieTracker

