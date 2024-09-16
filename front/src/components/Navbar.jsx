import { mainRoute, registerRoute, homeRoute, newAppointmentRoute, moreInfoRoute } from '../helpers/routes';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './navbar.module.css'
const Navbar = () => {

    const navigate = useNavigate();   
    const {pathname} = useLocation();
    const homeButton = () =>{
        navigate(homeRoute)
        
    }
    const profileButton = () =>{
        console.log("Boton del Perfil");
        
    }

    const appointmentsButton = () =>{
        navigate(homeRoute)
        
    }

  const logOut = () =>{
    
        navigate(mainRoute)
  }  

  const moreInfo = () =>{
    navigate(moreInfoRoute)
  }


 
    return (



<div className = {styles.navbar}>
    <div>     
        <h1 className={styles.title}>Asesoria Letrada - Poder Judicial de la Provinica de Córdoba</h1>
    </div>
    { pathname !== homeRoute  && pathname !== newAppointmentRoute && pathname !== moreInfoRoute && (
    <div><button onClick = {moreInfo} className={styles.buttonInfo}> <strong> More Info </strong> </button></div>    
    )}    
    
    
    { 
        pathname !== mainRoute && pathname !== registerRoute && pathname !== moreInfoRoute && ( 
    
    <div className={styles.options}>    
        <button onClick = {homeButton} className={styles.buttonOptions}> <strong> Home </strong> </button>
        <button onClick = {profileButton} className={styles.buttonOptions}> <strong> Profile </strong> </button>
        <button onClick = {appointmentsButton} className={styles.buttonOptions}> <strong> Appointments </strong> </button>
        <button onClick = {logOut} className={styles.buttonOptions}> Salir </button>
    </div> )}  
</div>   
  )
}

export default Navbar

// Los estilos de la Navbar van en el mismo lugar.
// Recordando que lo que esta antes de Return es es la logica y luego es lo que se renderiza.