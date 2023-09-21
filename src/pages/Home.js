import React, { useState, useEffect, useRef, useReducer, useContext } from 'react';
import '../css/home.css';

const moodContext = React.createContext();

function Home() {
  return (
    <div>
      <h1>Learning Hooks</h1>
      <EmbededComponent />
      <hr></hr>
      <UpdateMultipleState />
      <hr></hr>
      <UseEffect />
      <hr></hr>
      <UseRef />
      <hr></hr>
      {/* <UseReducer /> */}
      <hr></hr>
      <UseContext />
    </div>

  )
};

function EmbededComponent() {
  const [eid, setEid] = useState("lists");

  const [errors, setErrors] = useState({
    fristname: false,
    lastname:false,
    email:false
  })

  const updateStateHandler = ()=>{
    setErrors(prev=>{
      return {...prev, fristname: true}
    })
  }

  return (
    <div>
      <h3>EmbededComponent</h3>
      <button id="forms" onClick={(e) => setEid(e.target.id)}>forms</button>
      <button id="lists" onClick={(e) => setEid(e.target.id)}>lists</button>
      <button onClick={updateStateHandler}>object or array states</button>
      <ConditionedComponent id={eid} />
      <p>React doesn't allow object as values. It you want to re-render a BOOLEAN, you have to cast it to STRING.</p>
      <div className={`${(errors.fristname===true)?"true":""}`}>It is {errors.fristname.toString()}.</div>

    </div>
  )
}

function ConditionedComponent(prop) {

  var id = prop.id;

  switch (id) {
    case "lists":
      const cars = [
        { id: 1, brand: 'Ford' },
        { id: 2, brand: 'Haval' },
        { id: 3, brand: 'wrs' }
      ];
      return (
        <div className="App">
          <div>{cars.map((car) => <Myfunc key={car.id} brand={car.brand} id={id} />)}
          </div>
        </div>
      )
    case "forms":
      return (
        <div className="App">
          <p>forms
          </p>
        </div>
      )
  }
};

function UpdateMultipleState() {
  const [car, setCar] = useState({
    brand: "Ford",
    model: "Mustang",
    year: "1964",
    color: "false"
  });

  const changeColor = () => {
    setCar(previousState => {
      return { ...previousState, color: "true" }
    });
  };
  const changeBrand = () => {
    setCar({ brand: "subaru" });
  }

  return (
    <div>
      <h3>UseState Hook</h3>
      <p>Update Multiple States</p>
      <p>This is a {car.color} {car.brand} {car.model} from {car.year}.</p>
      <button onClick={changeColor}>Change color</button>
      <button onClick={changeBrand}>Change brand only</button>
    </div>
  )
};

function UseEffect() {
  const [count, setCount] = useState(0);
  const [sum, setSum] = useState(0);
  //setTimeout(()=>{setCount(count=>count+1)},1000);
  useEffect(() => {
    setSum(s => count + s);
  }, [count]);

  return (
    <div>
      <h3>UseEffect Hook</h3>
      useEffect runs on every render.
      <p>Some examples of side effects are: fetching data, directly updating the DOM, and timers.</p>
      <button onClick={() => { setCount(c => c + 1) }}>+</button>
      <p>count = {count} .</p>
      <p>sum = {sum} .</p>
    </div>
  )
};

function UseRef() {
  return (
    <div>
      <h3>UseRef Hook</h3>
      <ul>
        <li>The useRef Hook allows you to persist values between renders.</li>
        <li> it can be used to store a mutable value that does not cause a re-render when updated.li</li>
        <li>It can be used to access a DOM element directly.</li>
      </ul>
      <section id='flexContainer'>
        <div>
          <h4>Does Not Cause Re-renders</h4>
          If we tried to count how many times our application renders using the useState Hook, we would be caught in an infinite loop since this Hook itself causes a re-render.
          To avoid this, we can use the useRef Hook.
          <UseRefDoesNotCauseRerender />
        </div>
        <div>
          <h4>Accessing DOM Elements</h4>
          <UseRefAccessDOM />
        </div>
        <div>
          <h4>Tracking State Changes</h4>
          <UseRefTrackStateChanges />
        </div>
      </section>
    </div>

  )
};

function UseRefDoesNotCauseRerender() {
  const [inputValue, setInputValue] = useState("");
  //const [c,setC] = useState(-1);
  const count = useRef(0);

  //This way will also do:
  // useEffect(()=>{
  //   setC(c=>c+1);
  // },[inputValue]);
  
  //The initial render caused count.current++, 
  //so after the initial render, count.current has been set to 1.
  //But it won't show on the DOM, because it won't cause a second render.
  //count.current is always one step ahead of the DOM render
  useEffect(() => {
    console.log('DoesNotCauseRerender:count.current=',count.current);
    count.current = count.current + 1;
    console.log('DoesNotCauseRerender:count.current=',count.current);
  });

  return (
    <>
      <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)}></input>
      <p>Render times: {count.current}</p>
      {/* <p>Render times: {c}</p> */}
    </>
  )
};

function UseRefAccessDOM() {
  const someElement = useRef();
  const focusInput = () => {
    someElement.current.focus();
  }
  return (
    <>
      <input type='text' ref={someElement}></input>
      <button onClick={focusInput}>Focus</button>
    </>
  )
};

function UseRefTrackStateChanges() {
  const [inputValue, setInputValue] = useState('');
  const previousValue = useRef(''); 
  const renderCount = useRef(0);

  const setValueandLog = (value)=>{
    console.log('setValueandLog: before set InputValue= ',inputValue);
    setInputValue(value);
    console.log('setValueandLog: after set InputValue= ',inputValue);
  }
  useEffect(() => {
    console.log('use effect: before previous.current= ',previousValue.current);
    console.log('use effect: before renderCount.current= ',renderCount.current);
    previousValue.current = inputValue;
    renderCount.current++;
    console.log('use effect: after previous.current= ',previousValue.current);
    console.log('use effect: after renderCount.current= ',renderCount.current);
  }, [inputValue]);
  return (
    <>
      <input type='text' value={inputValue} onChange={(e) => setValueandLog(e.target.value)}></input>
      <p>current input value: {inputValue}</p>
      <p>Previous input value: {previousValue.current}</p>
      <p>Render count: {renderCount.current}</p>
      <p>React calls render first, and then calls useEffect. But ref doesn't cause a rerender. So ref is always one step ahead of the DOM render.</p>
    </>
  )
};

function UseReducer() {
  const initialTodos = [
    {
      id: 1,
      title: "Todo 1",
      complete: false,
    },
    {
      id: 2,
      title: "Todo 2",
      complete: true,
    },
  ];

  const reducer = (state, action) => {
    switch (action.type) {
      case "COMPLETE":
        return state.map(item => {
          if (item.id === action.id) {
            return { ...item, complete: !item.complete };
          } else { return item }
        })
      default:
        return state;
    }
  }
  const [todos, dispatch] = useReducer(reducer, initialTodos);

  const handleComplete = (todo) => {
    dispatch({ type: "COMPLETE", id: todo.id });
  };

  return (
    <div>
      <h3>UseReducer Hook </h3>
      <p>The useReducer Hook returns the current stateand a dispatchmethod.</p>
      {initialTodos.map(item => (
        <label>
          <input type='checkbox' checked={item.complete} onChange={handleComplete}></input>
          {item.title}
        </label>
      ))}

    </div>
  )
};

function UseContext() {
  const [moods, setMood] = useState({
    happy: '😀',
    sad: '😭',
  });

  function toggleMood() {
      setMood(prevState => {
        return { ...prevState, happy: prevState.sad, sad: prevState.happy} 
      });
  };

  return (
    <div className='useContext'>
      <h3>UseContext and UseState Hook {moods.sad}</h3>
      <button onClick={toggleMood}>Toggle Moods</button>
      <moodContext.Provider value={moods}>
        <NestedComponent />
      </moodContext.Provider>

    </div>
  )
};

function NestedComponent() {
  const moods = useContext(moodContext);
  return (
    <div>
      <h4>Nested component</h4>
      <p>{moods.happy}</p>
    </div>
  )
}

function Myfunc(prop) {
  return <p>{prop.id}: i am a {prop.brand}</p>
};

export default Home;