
import './App.css';
import Login_page from "../User_Authentication/Login_page"
import Home from "../Home/Home"
import {Route,Routes } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';


function App() {
  return (
    <div className="App">
        <HashRouter>
   <Routes>
    <Route  path='/' element={<Login_page/>} />
    <Route  path='/user' element={<Home/>} />
   </Routes>
   </HashRouter>
    </div>
  );
}

export default App;
