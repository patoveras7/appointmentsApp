import styles from "./styles/moreInfo.module.css"
import { Link } from "react-router-dom"
import { mainRoute } from "../helpers/routes"

const MoreInfo = () => {
  return (
    <div>
    <div className={styles.container}>
    <div className={styles.information}>La Asesoria Letrada de la Ciudad de Córdoba Capital esta ubicada en Calle Laprida N° 731 de Barrio Observatorio. Es una oficina publica destinada la representacion judicial de personas carentes de recursos y al servicio de la comunidad. Si usted no posee recursos para solventar un abogado particular y requiere asesoramiento en materia de Derecho Penal, Derecho Laboral, Derecho de Familia o cuestiones Civiles en general agende una cita para concer el procedimiento para la obtención de representación por parte de un Asesor Letrado. Recuerde que al ser una oficina publica esta abierta los 7 dias de la semana recibiendose turnos unicamente entre las 08:00 horas y las 16:00 horas, quedando las oficinas abiertas durante el resto del dia solo para la formulación de denunicas penales. </div>
    <Link to={mainRoute}><button className={styles.button}> Back Login </button></Link>
    </div>
    <div className={styles.background}></div>
    </div>
  )
}

export default MoreInfo