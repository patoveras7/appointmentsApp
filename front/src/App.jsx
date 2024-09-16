//import './App.css'
//import Home from "./views/Home";
import Navbar from "./components/Navbar"
import MyAppointments from './views/MyAppointments';
import Register from './views/Register';
import Login from './views/Login';
import {Routes, Route} from 'react-router-dom'
import { mainRoute, registerRoute, homeRoute, newAppointmentRoute, moreInfoRoute } from './helpers/routes';
import NewAppointmentForm from "./components/newAppointmentForm/NewAppointmentForm";
import MoreInfo from "./views/MoreInfo";









function App() { // Es la raiz de nuestro proyecto y es una funcion constructora por eso se pone con mayuscula. Lo que esta dentro del 
  // return lo que se renderiza en la pagina.
  
  return (
    <>
    <Navbar/>
    
    <Routes>
 {/* Se coloca la ruta y luego el elemento que queremos que se renderize con esa ruta. */}
    <Route path={mainRoute} element={<Login/>}/> 
    <Route path={registerRoute} element={<Register/>}/>
    <Route path={homeRoute} element={<MyAppointments/>}/>
    <Route path={newAppointmentRoute} element={<NewAppointmentForm/>}/>
    <Route path={moreInfoRoute} element={<MoreInfo/>}/>
    </Routes>
    

    </>
  )
  


}

export default App

// {} las llaves se usan para meter codigo de JS en React.