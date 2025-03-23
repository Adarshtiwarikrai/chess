import { useState } from 'react';
import './index.css'; // Ensure this contains your Tailwind CSS imports
import { BrowserRouter, Routes ,Route} from 'react-router-dom';
import {Game} from './game'
import { Dictaphone } from './phone.jsx'
function App() {
  const [user, setUser] = useState(0);

  return (
  <BrowserRouter>
  <Routes>
    <Route path='/game' element={<Game/>}></Route>
    <Route path='/phone' element={<Dictaphone/>}></Route>
  </Routes>
  </BrowserRouter>
  );
}

export default App;
