import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
//import axios from "axios"
import styles from './styles/login.module.css'
import { homeRoute, registerRoute } from "../helpers/routes"
import { useLoginUserMutation } from "../redux/features/users/usersApi"
import { useDispatch } from "react-redux"
import { setUserData } from "../redux/features/users/usersSlice"

const Login = () => {

const navigate = useNavigate(); // Lo usamos para redireccionar luego de una accion del usuario. En cambio el Navigate lo usamos cuando requerimos una redireccion sin intervencion del usuario.

const [loginUser] = useLoginUserMutation();
const dispatch = useDispatch(); // Con esto despachamos acciones.

const [loginData, setLoginData] = useState({
  username : '',
  password : '',
});



const handleInputChange = (event) => { // Recibe un evento que es el elemento que dispara el evento.
  const {name, value} = event.target;

setLoginData({ ...loginData, [name]: value });      

}

const handleOnSubmit = async (event) => {
  try{
  event.preventDefault();

  // BEFORE REDUX

  // const response = await axios.post("http://localhost:3000/users/login", loginData)
  // if (response.status === 200) {
  //   // si usamos axios la response siempre viene en un objeto data.
  //   // Lo que vamos a hacer ahora es guardar el ID del usurio en el LocalStorage, asi despues podemos ver solo la info del usuario y nada mas en el Home
  //   // Recordar con LOCAL STORAGE: Se gurada en string y no se pueden guardar dos datos con el mismo nombre.
  //   // Clase que viene esto se hace con redux. 
  //   localStorage.setItem("userId", response.data.user.id) // Lleva dos parametros. El primero es la clave. El segundo es el valor.
  //   localStorage.setItem("user", JSON.stringify(response.data.user)) // O podemos usar el parse. 
  //   {navigate(homeRoute)}
  // }
  // Por parametro le pasamos el mismo estado donde se guardaron los datos que ingresó el usuario.
  // unwrap() se utiliza para que el mismo redux me maneje los errores.


 // AFTER REDUX

const response = await loginUser(loginData).unwrap() // Por parametro le pasamos el mismo estado donde se guardaron los datos que ingresó el usuario.
console.log(response);

dispatch(setUserData(response))
navigate(homeRoute)
}catch(error){
  console.log(error);
  
  alert("Las credenciales son incorrectas.")
}

setLoginData({
  username : '',
  password : '',
  
})    

}


  
return (

 

<div>
<div className={styles.container}>

<div className={styles.formContainer}>

  <form action="#" method="POST" onSubmit={handleOnSubmit}>
      
      <h2 className={styles.title}>Login</h2>

  
    
      <div>
      <label htmlFor="username" className={styles.label}>username</label>
      <input className={styles.input} type="text" id="username" name="username" value={loginData.username} onChange={handleInputChange} />
      </div>
    
      <div>
      <label htmlFor="password" className={styles.label}>password</label>
       <input className={styles.input} type="password" id="password" name="password" value={loginData.password} onChange={handleInputChange} />
       </div> 
    

       <div>
       
       </div> 
    
    

      <button className={styles.button} type="submit">Login</button>


  </form>

  {/* Antes con HTML usabamos la etiqueta <a> pero con react podemosa usar Link que es bastante didactico. */}

  <Link to={registerRoute}><p className={styles.registrate}>Registrarte</p></Link> 




</div>
</div>

<div className={styles.background}></div>
</div>





)

}
export default Login