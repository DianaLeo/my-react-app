import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './index.css';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import NoPage from './pages/NoPage';
import reportWebVitals from './reportWebVitals';

export default function MyReactApp(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MyReactApp/>);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
