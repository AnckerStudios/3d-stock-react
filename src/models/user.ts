export interface IUser {
    firstname: string,
    lastname:string,
    img: string,
    email: string,
    role: string,
    balance: number
  }
export enum ROLE{
  USER,
  MODER
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
export interface UserInformation{
  image: FileList,
  firstname: string,
  lastname:string,
}