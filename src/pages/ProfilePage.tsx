import { useState } from "react";
import ProductItem from "../components/productItem";
import { getProducts } from "../data/models";
import { IProduct } from "../models/product";

const ProfilePage = () => {
    const [arr,setArr] = useState<IProduct[]>([]);
 getProducts().then((item) => setArr(item));

  return (
    <>
    <div className="w-full bg-indigo-200 p-4">
        <div className=" max-w-7xl  mx-auto  ">
        <div className="w-72">
        <img
          src="https://placekitten.com/500/500"
          className=" rounded-md w-full"
        />
        </div>
        </div>
    </div>
    <div className=" max-w-7xl  mx-auto">
        
      <div className="w-full flex flex-col gap-2">
      
        <div className="grid grid-cols-3 gap-1">
          {arr.map((item, index) => (
            <ProductItem key={index} product={item} />
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfilePage;
