
import './App.css';
import Login_page from "../User_Authentication/Login_page"
import Home from "../Home/Home"
import { BrowserRouter,Route,Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
   <Routes>
    <Route  path='/' element={<Login_page/>} />
    <Route  path='/user' element={<Home/>} />
   </Routes>
   </BrowserRouter>
    </div>
  );
}

export default App;
