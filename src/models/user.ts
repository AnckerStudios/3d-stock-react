export interface IUser {
    firstname: string,
    lastname:string,
    email: string,
    token: string
  }
  
  export interface IGenericResponse {
    status: string;
    message: string;
  }
  export interface Inputs {
    email: string;
    password: string;
  }
  export interface RegisterForm {
    firstname: string,
    lastname:string,
    email: string;
    password: string;
  }