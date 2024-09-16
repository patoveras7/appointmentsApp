// import { useState } from "react"
// import { useNewAppointmentMutation } from "../../redux/features/appointments/appointmentsApi";
// import { useSelector } from "react-redux";
// import { homeRoute } from "../../helpers/routes";
// import { useNavigate } from "react-router-dom"
// //import validateAppointmentForm from "../../helpers/validateAppointmentForm";
// const NewAppointmentForm = () => {



// const navigate = useNavigate();
  
// const id = useSelector((state) => state.usersSlice.user.id);
// console.log(id);

//   const [appointment, setAppointments] = useState({
//     userId: id,
//     date: "",
//     time: ""

// });



// const [newAppointment] = useNewAppointmentMutation();


  
// const submitForm = async (event) =>{
// event.preventDefault();
// try{
// await newAppointment(appointment);
// alert("Cita agendada");
// navigate(homeRoute, {state: {refetch: true}});

//   }catch(error){
//   console.error(error.response?.data);
//   alert("Cita no agendada")
//   }
//   }

  
  
//   return (
//     <div>
//         <form action="" method="POST" onSubmit={submitForm}>
//         <div>  
//         <label htmlFor="date">Fecha:</label>
//         <input type="date" name="date" value={appointment.date} onChange={(event) => setAppointments({...appointment, date: event.target.value})}/>
//         </div>
//         <div>
//         <label>Hora:</label>
//         <input type="time" name="time" value={appointment.time} onChange={(event) => setAppointments({...appointment, time: event.target.value})}/>
//         </div>
//         <button type="submit">Enviar</button>
//         </form>
//     </div>
//   )
// }

// export default NewAppointmentForm

import { useState } from "react";
import { useNewAppointmentMutation } from "../../redux/features/appointments/appointmentsApi";
import { useSelector } from "react-redux";
import { homeRoute } from "../../helpers/routes";
import { useNavigate } from "react-router-dom";
import styles from "./NewAppointmentForm.module.css";


const NewAppointmentForm = () => {
  const navigate = useNavigate();
  const id = useSelector((state) => state.usersSlice.user.id);

  const [appointment, setAppointments] = useState({
    userId: id,
    date: "",
    time: ""
  });

  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");

  const [newAppointment] = useNewAppointmentMutation();

  const isDateAfterToday = (inputDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const inputDateObj = new Date(inputDate);
    return inputDateObj > today;
  };

  const isTimeWithinBusinessHours = (inputTime) => {
    const [hours, minutes] = inputTime.split(':').map(Number);
    const inputTimeInMinutes = hours * 60 + minutes;
    const startTimeInMinutes = 8 * 60;   
    const endTimeInMinutes = 16 * 60;    
    return inputTimeInMinutes >= startTimeInMinutes && inputTimeInMinutes <= endTimeInMinutes;
  };

  const handleDateChange = (event) => {
    const { value } = event.target;
    setAppointments({...appointment, date: value});

    if (!isDateAfterToday(value)) {
      setDateError("La fecha debe ser posterior a la de hoy.");
    } else {
      setDateError("");
    }
  };

  const handleTimeChange = (event) => {
    const { value } = event.target;
    setAppointments({...appointment, time: value});

    if (!isTimeWithinBusinessHours(value)) {
      setTimeError("El horario debe estar entre las 08:00 y las 16:00 horas.");
    } else {
      setTimeError("");
    }
  };

  const submitForm = async (event) =>{
    event.preventDefault();

    if (dateError || timeError) {
      alert("Por favor corrige los errores antes de enviar el formulario.");
      return;
    }

    try {
      await newAppointment(appointment);
      alert("Cita agendada");
      navigate(homeRoute, {state: {refetch: true}});
    } catch(error) {
      console.error(error.response?.data);
      alert("Cita no agendada");
    }
  };

  return (
    <div>
      <div className={styles.container}>
      <form action="" method="POST" onSubmit={submitForm} className={styles.formContainer}>
        <div>  
          <label htmlFor="date">Fecha: </label>
          <input 
            type="date" 
            name="date" 
            value={appointment.date} 
            onChange={handleDateChange}
          />
          {dateError && <p style={{ color: "red" }}>{dateError}</p>}
        </div>
        <div>
          <label htmlFor="time">Hora: </label>
          <input 
            type="time" 
            name="time" 
            value={appointment.time} 
            onChange={handleTimeChange}
          />
          {timeError && <p style={{ color: "red" }}>{timeError}</p>}
        </div>
        <button type="submit" className={styles.button}>Enviar</button>
      </form>
      </div>
      <div className={styles.background}></div>
    </div>
  );
};

export default NewAppointmentForm;
