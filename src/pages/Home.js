import App from './App';

var btnid = '';
const btncollection = document.querySelectorAll('button');
btncollection.forEach((item)=>{
  item.addEventListener('click',function(){myfunc(item.id)});
});
function myfunc(a){
  btnid=a;
  root.render(
    <App btntype={ btnid } />
  );
}

function Home() {
  

  return (
    <div>
      <h1>Home</h1>
      <button id="lists">lists</button>
      <button id="forms">forms</button>
    </div>

  )
};
  
export default Home;