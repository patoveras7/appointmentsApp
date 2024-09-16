import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    login: false,
    user: {}
}


const usersSlice = createSlice({
    name: "usersSlice", // Mismo nombre de la funcion.
    initialState, // Estado inicial del estado global de usuarios.
    reducers: { 
    // Aqui van las actions. Funciones que ejecutan la logica dentro de reduce.
    setUserData: (state, action) => {
    // Recine el estado actual y la accion que quiere realizar el usuario.
        state.login = action.payload.login ; // Los estados los moficamos con la info que nos viene de payload.
        state.user = action.payload.user ;  
    },    

    logout: (state) => {
        state.login = false;
        state.user = {};
    }


    }
})

// Se exportan en este orden. Primero las ACTIONS y luego el reducer.
export const {setUserData, logout} = usersSlice.actions;
export default usersSlice.reducer
