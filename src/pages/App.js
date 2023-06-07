function Myfunc(prop){
  return <p>i am a {prop.brand}</p>
}

function App(prop) {
  switch (prop.btntype){
    case "lists" :
      const cars = [
        {id:1,brand:'Ford'},
        {id:2,brand:'Haval'},
        {id:3,brand:'wrs'}
      ];
      return (
      <div className="App">
        <div>{cars.map((car)=><Myfunc key={car.id} brand={car.brand}/>)}
        </div>
      </div>
      )
    case "forms" :
      return (
        <div className="App">
          <p>forms
          </p>
        </div>
        )
    
  }

}

export default App;
