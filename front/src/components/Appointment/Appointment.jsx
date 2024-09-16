
import styles from './appointment.module.css'
const Appointment = (objeto) => {
  console.log(objeto);

  const {date, time, status, id} = objeto.prueba

  const {cancelAppointment} = objeto

  const statusClass = status === 'active' ? styles.statusActive : styles.statusCancelled;

  const formattedTime = time.slice(0, 5);
  
  return (
    <div className={styles.appointment}>
    
      <p className={styles.data}>Fecha: {date}</p>
      <p className={styles.data}>Hora: {formattedTime}</p>
      <p className={`${styles.data} ${statusClass}`}>{status}</p>    
    

      <button className={styles.button} onClick={() => cancelAppointment(id)}>Cancelar</button>

    </div>
  )
}

export default Appointment