
import './App.css';
import {
  BrowserRouter as  Router ,
  Routes,
  Route
 } from 'react-router-dom';
import { Home } from './Components/Home/Home';
import { Products } from './Components/Products/Products';
import {Uploadform} from './Components/Uplod-data/Uploadform';
import { SingleCart } from './Components/SingleCart/SingleCart';
import { Detail } from './Components/Deatail/Detail';
import { Buyform } from './Components/BuyForm/Buyform';


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/'  element={<Home/>}  />
        <Route path='/Products' element={<Products/>}  />
        <Route path='/Uploadform' element={<Uploadform/>}  />
        <Route path='/SingleCart/:id' element={<SingleCart/>} />
        <Route path='/Detail' element={<Detail />} />
        <Route path='/Buyform' element={<Buyform />} />
      </Routes>
    </Router>

    </>
  );
}

export default App;
