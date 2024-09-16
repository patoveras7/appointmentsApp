function isDateBeforeToday(inputDate) {

    const today = new Date();

    const inputDateObj = new Date(inputDate);
    
    return inputDateObj < today;
}


const validateRegisterForm = (userData) => {
    const errors = {};

    if (!userData.name) {
        errors.name = "El nombre es requerido";
    } else if (/[0-9]/.test(userData.name)) {
        errors.name = "No debe contener números";
    } else if (/[^A-Za-zÀ-ÿ\s]/.test(userData.userName)) {
        errors.name = "El Nombre y Apellido no puede contener caracteres especiales ej: #&$!_";
    } else if (userData.name.length < 3) {
        errors.name = "Debe tener mínimo 3 caracteres";
    }

    if (!userData.email) {
        errors.email = "El email es requerido";
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(userData.email)) {
        errors.email = "No tiene formato email";
    }

    if (!userData.birthdate) {
        errors.birthdate = "La fecha de nacimiento es requerida";
    } else if (!isDateBeforeToday(userData.birthdate)) {
        errors.birthdate = "La fecha debe ser menor a la actual";
    }

    if (!userData.nDni) {
        errors.nDni = "El DNI es requerido";
    } else if (typeof userData.nDni === "number") { // Prestar atencion: Se coloca de esta forma porque DNI llega como string. 
        errors.nDni = "El DNI es inválido";
    } else if (userData.nDni.length < 7) {
        errors.nDni = "El DNI es inválido";
    }

    if (!userData.username) {
        errors.username = "El nombre de usuario es requerido";
    } else if (userData.username.length < 3) {
        errors.username = "Debe tener mínimo 3 caracteres";
    }

    if (!userData.password) {
        errors.password = "La contraseña es requerida";
    } else if (userData.password.length < 6) {
        errors.password = "Debe tener mínimo 6 caracteres";
    }

    if (userData.repeatPassword !== userData.password) { // Prestar atencion, anteriormente se habia colocado (!userData.repeatPassword === userData.password) y no funcionó.
        errors.repeatPassword = "Las contraseñas no coinciden";
    }

    return errors;

};

export default validateRegisterForm;