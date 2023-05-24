import axios from "../axios";
import { IProduct } from "../models/product";
import { IUser } from "../models/user";

// let users: IUser[] = [];
//   for (let i = 0; i < 8; i++) {
//     users.push({
//       email:i===0? "AnckerStudios": "User"+i,
//       firstname:"Илья",
//       lastname:"Ермолин",
//       img:"https://placekitten.com/500/500",
//       role:"USER"
//     })
//   }

// let arr: IProduct[] = [];
//   for (let i = 0; i < 200; i++) {
//     arr.push({
//       id: `${i}`,
//       name: `Image ${i}`,
//       description: `Описание модели ${i}`,
//       price: i*100,
//       img: `testMain/${(i%15)+1}.jpeg`,
//       model: `/testModel/${i + 1}/scene.gltf`,
//       status: (i+1)%4 === 1 ? 'valid' : (i+1)%4 === 2 ? 'draft' : (i+1)%4 === 3 ? 'wait' : 'invalid',
//       user: users.at((i%7)) ?? users[0]
//     })
//   }
  
  // export async function getAllProducts() { //
  //   let validArr = arr.filter(x=> x.status === 'valid')
  //   return validArr;
  // }
  // export async function getProductsByUser(user: string,status:string) { //
  //   let userArr = arr.filter(x=> x.user.email === user )
  //   if(status != 'all'){
  //     userArr = userArr.filter(x=>x.status === status)
  //   }
  //   return userArr;
  // }
  // export async function getProfile(userLogin: string) { 
  //   let user = users.find(user => user.email === userLogin);
  //   return user ?? null;
  // }

  // export async function getProduct(id: string) { //
  //   // await fakeNetwork(`contact:${id}`);
  //   // let contacts = await localforage.getItem("contacts");
  //   let product = arr.find(product => product.id === id);
  //   return product ?? null;
  // }

  export async function getModel(id:string) {
    const {data} = await axios.get(
      `/api/model/${id}`
    );
    return data;
  }

  export async function getAllModels() {
    const {data} = await axios.get(
      `/api/model`
    );
    return data;
  }

  export async function getMyModels(status: string) {
    const {data} = await axios.get(
      `/api/model/status/${status}`
    );
    return data;
  }

  export async function getUserModels(id: string) {
    const {data} = await axios.get(
      `/api/model/user/${id}`
    );
    return data;
  }

  export async function getProfile(userLogin: string) { 
    const {data} = await axios.get(
      `/api/user/${userLogin}`
    );
    return data;
  }