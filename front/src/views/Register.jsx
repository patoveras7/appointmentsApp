
import styles from './styles/register.module.css'
import { useState } from "react";
import axios from "axios";
import validateRegisterForm from '../helpers/validateRegisterForm';
import { mainRoute} from '../helpers/routes'
import { Link, useNavigate } from 'react-router-dom';
const Register = () => {

  const navigate = useNavigate();  

const [registerData, setRegisterData] = useState({
    name : '',
    email : '',
    birthdate : '',
    nDni : '',
    username : '',
    password : '',
    repeatPassword: ''
});

const [errors, setErrors] = useState({});

const handleInputChange = (event) => { // Recibe un evento que es el elemento que dispara el evento.
    const {name, value} = event.target;

    // if (name === 'name') setRegisterData({...registerData, name: value})
    // if (name === 'email') setRegisterData({...registerData, email: value})
    // if (name === 'birthdate') setRegisterData({...registerData, birthdate: value})
    // if (name === 'nDni') setRegisterData({...registerData, nDni: value})    
    // if (name === 'username') setRegisterData({...registerData, username: value})    
    // if (name === 'password') setRegisterData({...registerData, password: value})   

setRegisterData({ ...registerData, [name]: value });      



//  const errors = validateRegisterForm(registerData);
//  setErrors(errors);

 const newErrors = validateRegisterForm({ ...registerData, [name]: value });
        setErrors({ ...errors, [name]: newErrors[name] });    
}

const handleOnSubmit = async (event) => {
  event.preventDefault();

  if (errors.name || errors.email || errors.birthdate || errors.nDni || errors.username || errors.password || errors.repeatPassword) {
    alert("Por favor corrige los errores antes de enviar el formulario.");
    return;
  }

  try{

    axios.post("http://localhost:3000/users/register", registerData)
    .then((response) => {
    console.log(response);
    if (response.status === 201) {navigate(mainRoute)}
    alert("Usuario creado exitosamente")
    })
  }catch(error){
    console.log(error);
    alert("No ha sido posible crear el usuario")
  }
  setRegisterData({
    name : '',
    email : '',
    birthdate : '',
    nDni : '',
    username : '',
    password : '',
    repeatPassword: ''
  })    

}

const isFormValid = () => {
  return Object.values(registerData).every(field => field !== '');
}
    
  return (


<div>    

<div className={styles.container}>

  <div className={styles.formContainer}>

    <form action="#" method="POST" onSubmit={handleOnSubmit}>
        
        <h2 className={styles.title}>Register</h2>

          

        <div>
        <label htmlFor="name" className={styles.label}>name</label>
        <input className={styles.input} type="text" id="name" name="name" value={registerData.name} onChange={handleInputChange} />
        {errors.name && <p style={{color: 'red'}}>{errors.name}</p>}
        </div>
         
         <div>
         <label htmlFor="email"className={styles.label}>email</label>
         <input className={styles.input} type="email" id="email" name="email" value={registerData.email} onChange={handleInputChange} />
         {errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
         </div>
      
        <div>
         <label htmlFor="birthdate" className={styles.label}>birthdate</label>
        <input className={styles.input} type="date" id="birthdate" name="birthdate" value={registerData.birthdate} onChange={handleInputChange} />
        {errors.birthdate && <p style={{color: 'red'}}>{errors.birthdate}</p>}
        </div>

        <div>
        <label htmlFor="nDni" className={styles.label}>nDni</label>
        <input className={styles.input} type="number" id="nDni" name="nDni" value={registerData.nDni} onChange={handleInputChange} />
        {errors.nDni && <p style={{color: 'red'}}>{errors.nDni}</p>}
        </div>
      
        <div>
        <label htmlFor="username" className={styles.label}>username</label>
        <input className={styles.input} type="text" id="username" name="username" value={registerData.username} onChange={handleInputChange} />
        {errors.username && <p style={{color: 'red'}}>{errors.username}</p>}
        </div>
      
        <div>
        <label htmlFor="password" className={styles.label}>password</label>
         <input className={styles.input} type="password" id="password" name="password" value={registerData.password} onChange={handleInputChange} />
         {errors.password && <p style={{color: 'red'}}>{errors.password}</p>}
         </div> 
      
         <div>
        <label htmlFor="repeatPassword" className={styles.label}>repeat password</label>
         <input className={styles.input} type="password" id="repeatPassword" name="repeatPassword" value={registerData.repeatPassword} onChange={handleInputChange} />
         {errors.repeatPassword && <p style={{color: 'red'}}>{errors.repeatPassword}</p>}
         
         </div> 
      
      

        <button className={styles.button} type="submit" disabled={!isFormValid()}>Submit</button>


    </form>

    <p className={styles.login}>Ya estas registrado?</p>
    <Link to={mainRoute}><p className={styles.login}>Ingresa al Sitio</p></Link>

    

    </div>


  </div>
  <div className={styles.background}></div>
  </div>







  )
}

export default Register