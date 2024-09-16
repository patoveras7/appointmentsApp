// Se usamos Toolkit solo no va la palabar Api en el nombre del archivo pero si usamos RTK Query si tiene que ir.
// Esta es la forma mas facil de hacer peticiones asincronas con redux.
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


// El reducer en este caso es lo que sigue:
export const appointmentsApi = createApi({
    
    reducerPath: "appointmentsApi", // Es el nombre que va a llevar la API, que por buenas practicas lleva el mismo nombre que lo que se esta exportando.
    
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }), // La URL base de la API.
    
    endpoints: (builder) => ({

// Entonces para mis peticiones POST la siguiente va a ser el modelo. Le pongo el nombre que yo quiera, builder.mutation
// y entre parentisis defino como va a ser. Le tengo que pasar una función con esos parametros.           
        cancelAppointment: builder.mutation({ // Si fuera un GET, es .query
            query: (idAppointment) => ({ // con los parentisis retornamos un objeto sin necesidad e RETURN. Sino => {return{...}}
                url: `appointments/cancel/${idAppointment}`,
                method: "PUT", // Si fuera GET no es necesario colocar el method ya que por defecto es GET.

            }),
        }),

        newAppointment: builder.mutation({
            query: (appointmentData) => ({ 
                url: "appointments/schedule",
                method: "POST", 
                body: appointmentData
            }),
        }),

    }),
}); 

export const { useCancelAppointmentMutation, useNewAppointmentMutation } = appointmentsApi



