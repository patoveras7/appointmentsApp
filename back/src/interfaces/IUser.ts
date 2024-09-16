// Se determina la estructura de un objeto y TS esta atento a que dicha estructura sea correcta.

// interface IUser {
//     id: number,
//     name: string,
//     email: string,
//     active: boolean
// }

interface IUser {
    id: number,
    name: string,
    email: string,
    birthdate: Date,
    nDni: number,
    credentialsId: number
}

export default IUser;


