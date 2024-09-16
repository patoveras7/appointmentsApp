// El Store es el lugar donde guardamos todos los estados globales. Y es el encargado de conectar React con Redux y viceversa.
import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./features/users/usersApi";
import userReducer from "./features/users/usersSlice";
import { appointmentsApi } from "./features/appointments/appointmentsApi";


const store = configureStore({
// Dentro de el store se guardan todos los estados globales.    
reducer: {
    usersSlice: userReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [appointmentsApi.reducerPath]: appointmentsApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware, appointmentsApi.middleware),
});

export default store;