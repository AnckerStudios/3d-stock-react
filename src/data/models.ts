import { IProduct } from "../models/product";

let arr: IProduct[] = [];
  for (let i = 0; i < 16; i++) {
    arr.push({
      id: `${i}`,
      name: `Image ${i}`,
      img: `testMain/${i + 1}.jpeg`,
      model: `/testModel/${i + 1}/scene.gltf`
    })
  }

  export async function getProducts() {
    // await fakeNetwork(`getContacts:${query}`);
    // let contacts = await localforage.getItem("contacts");
    // if (!contacts) contacts = [];
    // if (query) {
    //   contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
    // }
    return arr;
  }
  
  
  export async function getProduct(id: string) {
    // await fakeNetwork(`contact:${id}`);
    // let contacts = await localforage.getItem("contacts");
    let product = arr.find(product => product.id === id);
    return product ?? null;
  }