import { useState } from 'react';



function Home() {
  const [eid, setEid] = useState("lists");

  function ShowSection() {
    switch (eid) {
      case "lists":
        const cars = [
          { id: 1, brand: 'Ford' },
          { id: 2, brand: 'Haval' },
          { id: 3, brand: 'wrs' }
        ];
        return (
          <div className="App">
            <div>{cars.map((car) => <Myfunc key={car.id} brand={car.brand} />)}
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

  return (
    <div>
      <h1>Home</h1>
      <button id="lists" onClick={(e) => setEid(e.target.id)}>lists</button>
      <button id="forms" onClick={(e) => setEid(e.target.id)}>forms</button>
      <ShowSection />
    </div>

  )
};



function Myfunc(prop) {
  return <p>i am a {prop.brand}</p>
}

export default Home;