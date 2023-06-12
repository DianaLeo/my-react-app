import { useState, useEffect, useRef } from 'react';
import '../css/home.css';


function Home() {
  return (
    <div>
      <h1>Home</h1>
      <EmbededComponent />
      <hr></hr>
      <UpdateMultipleState />
      <hr></hr>
      <UseEffect />
      <hr></hr>
      <UseRef />
    </div>

  )
};

function EmbededComponent() {
  const [eid, setEid] = useState("lists");

  return (
    <div>
      <h3>EmbededComponent</h3>
      <button id="forms" onClick={(e) => setEid(e.target.id)}>forms</button>
      <button id="lists" onClick={(e) => setEid(e.target.id)}>lists</button>
      <ConditionedComponent id={eid} />
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
    color: "red"
  });

  const changeColor = () => {
    setCar(previousState => {
      return { ...previousState, color: "blue" }
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
  const [inputValue, setInputValue] = useState();
  // const [c,setC] = useState(0);
  const count = useRef(0);

  //虽然这样也行，但是会报warning
  // useEffect(()=>{
  //   setC((c)=>c+1);
  // },[inputValue]);
  useEffect(() => {
    count.current = count.current + 1;
  });

  return (
    <>
      <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)}></input>
      <p>Render times: {count.current}</p>
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
  const [inputValue, setInputValue] = useState();
  const previousValue = useRef();
  useEffect(() => {
    previousValue.current = inputValue;
  },[inputValue]);
  return (
    <>
      <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)}></input>
      <p>Previous input value: {previousValue.current}</p>
    </>
  )
}

function Myfunc(prop) {
  return <p>{prop.id}: i am a {prop.brand}</p>
}

export default Home;