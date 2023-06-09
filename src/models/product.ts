import { IUser } from "./user";

export interface IProduct {
    id: string,
    name: string,
    description: string,
    price: number,
    img: string,
    model: string,
    status: string,
    user: IUser,
    background: string,
    textures: boolean,
    animated: boolean,
    size: number,
    publicDate: string,
    polygonCount: number
}
export interface IOption {
    id: number;
    name: string;
    action: Function;
  }

export interface IComment{
    id: string,
    user: IUser,
    text: string,
    date: string
}

export interface ICategory{
    id?: string,
    name: string,
    count: number
}