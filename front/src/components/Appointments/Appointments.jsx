import { useEffect } from "react"
//import allAppointments from "../../helpers/allAppointments"
import Appointment from "../Appointment/Appointment"
//import axios from "axios";
import styles from './appointments.module.css'
import { useSelector } from "react-redux";
import { useGetUserByIdQuery } from "../../redux/features/users/usersApi";
import { useCancelAppointmentMutation } from "../../redux/features/appointments/appointmentsApi";
import { Link, useLocation } from "react-router-dom";
import { newAppointmentRoute } from "../../helpers/routes";

const Appointments = () => {

 

// A penas se monta el componente va a ejecutar lo que esta en el USEEFECT()
// Dentro del UseEffect se trabaja con try/catch y con promesas. Pero lo mas eficiente es trabajar con promesas.
// El problema es que el UseEfect no puede ser async entonces si lo quiero hacer con try/catch debo generar
//un funcion que ejectue la preticion y esa funcion tratarla como asincrona.  


//const [appointments, setAppointments] = useState([]);
//const [status, setStatus] = useState(false);
//const [idUser, setIdUser] = useState(null);


// Con esto me traigo el estado global y le pasamos un callback a traves del cual recibe el estado y le decimos
// que de todo el estado que es lo que queremos traer
//const idUser = useSelector((state) => state.usersSlice.user.id); // Aca va estar la info del usuario logueado guardada en el estado global.

const userId = useSelector((state) => state.usersSlice.user.id);

const location = useLocation();

// Con esto traigo la info del usuario. Siempre las respuestas van a estar en una DATA pero como en algun momento 
// pueden ser muchas siempre renombramos con ':'. Otras propiedades son error y isLoading (y isSuccesful que ahora es redundante usar). 
// Como ya tengo la info del usuario aca ya no necesito el estado local y ESTO es todo lo que necesito para hacer
// la petición, ya que aca se maneja la data, el error, el tiempo de espera, etc.
const {data: dataUserById, 
  error: errorUserById, 
  isLoading: isLoadingUserById, 
  refetch: userRefetch // SE USA PARA UNA ACTUALIZACION DE USUARIOS, EN ESTE CASO PARA QUE EL TURNO PASE A CANCELADO AUTOMATICAMENTE.
} = useGetUserByIdQuery(userId); 

// El useEfect maneja el ciclo de vida de los componentes lo cual acarrea el montaje que es el codigo que se ejecuta ni bien 
// se monta y luego viene el array de dependencias a lo que React tiene que prestarle mucha atención
// porque en caso de que se modifique algo de lo que esta en el array de dependencias se va a ejecutar el useEfect nuevamente.
// useEffect(()=>{
// //setIdUser(localStorage.getItem("userId"));
//   if (userId) {
//   axios.get(`http://localhost:3000/users/${userId}`) // Esto es una PETICION ASINCRONA.
//   .then((res) => {
//     if (res.data.appointments) {
//       return res.data.appointments.sort((a,b) => new Date(a.date) - new Date(b.date));
//     }
//   })
//   .then((res)=>{
//   setAppointments(res)

// })
// .catch(error => alert(error));
// }
// return () => setAppointments([]); // PARA QUE EL ESTADO SE VACIE UNA VEZ SE DESMONTE EL COMPONENTE.

// }, [userId]);


const [cancelAppointmentMutation] = useCancelAppointmentMutation();

const cancelAppointment = async (id) => {
  await cancelAppointmentMutation(id);
  userRefetch();
  //setStatus(!status);
}

useEffect(() => {
  if (location.state?.refetch) {
  userRefetch();   
  }
}, [location.state, userRefetch]);

// //useEffect: Se utiliza para ejecutar código en respuesta a cambios en los valores pasados como dependencias (en este caso, location.state y userRefetch).
// location.state?.refetch:
// Verifica si refetch es true en el estado de la ubicación. Este valor podría haber sido pasado desde otra vista al navegar con navigate.
// Si refetch es true, significa que se ha creado un nuevo turno y necesitamos actualizar la lista de turnos llamando a userRefetch.
// El estado refetch pasa a true en el estado de la ubicación cuando navegas de una vista a otra utilizando navigate en React Router.

  return (
    <div>
    <div className={styles.container}>

    {isLoadingUserById ? "Cargando..." 
    : errorUserById ? "Se produjo un error" 
    : dataUserById.appointments.length === 0 ? 
    <p className={styles.noAppointments}> <strong>No hay turnos para el usuario logeado. Puede agendar una cita clickeando en el siguiente boton. Recuerde haber leido la informacion presente en la vista -Mas Info- (acceda a la misma desde el inicio).</strong></p>
    :dataUserById.appointments.map((appointment)=>{ // React necesita KEYS para poder diferenciar que objetos del arreglo. Se aprovecha el id del turno.
        return <Appointment key={appointment.id} prueba={appointment} cancelAppointment={cancelAppointment}/>
        // date={appointment.date} 
        // time={appointment.time} 
        // status={appointment.status} 
        // name={appointment.user.name} 
        // nDni={appointment.user.nDni}/> // La Key no se puede ver, y si le queremos pasar informacion a la que si necesitamos acceder podemos pasarle
        // o el objeto entero
      })
    }

    <Link to={newAppointmentRoute}><button className={styles.buttonCreate}>Crear Nuevo Turno</button></Link>
    </div>
    <div className={styles.background}></div>
    </div>
  )
}

export default Appointments