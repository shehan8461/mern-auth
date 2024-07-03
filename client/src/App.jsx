import {BrowserRouter ,Routes,Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Signin from './Pages/Signin';
import SignUp from './Pages/SignUp';
import Profile from './Pages/Profile';

export default function App() {
  return <BrowserRouter>
  
  <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/about" element={<About/>}></Route>
    <Route path="/sign-in" element={<Signin/>}></Route>
    <Route path="/sign-up" element={<SignUp/>}></Route>
    <Route path="/profile" element={<Profile/>}></Route>
    
  </Routes>
  
  </BrowserRouter>
  
}
