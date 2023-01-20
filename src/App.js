import logo from './logo.svg';
import './App.css';
import Email_Auth from './Components/Email_Auth';
import Newpage from './Components/Newpage'
import { BrowserRouter,Route,Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
   <Routes>
    <Route  path='/' element={<Email_Auth/>} />
    <Route  path='/user' element={<Newpage/>} />
   </Routes>
   </BrowserRouter>
    </div>
  );
}

export default App;
