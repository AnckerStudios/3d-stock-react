import { Suspense, useState } from "react";
import ProductItem from "./components/productItem";
import { IProduct } from "./models/product";
import { Canvas } from "@react-three/fiber";
import Test3DView from "./components/test3DView";
import { Environment, Loader } from "@react-three/drei";

function App() {
  const [count, setCount] = useState(0);
  let arr: IProduct[] = [];
  for (let i = 0; i < 16; i++) {
    arr.push({
      id: `${i}`,
      name: `Image ${i}`,
      img: `testMain/${i + 1}.jpeg`,
    });
  }
  return (
    <>
      <div className="w-full p-3 bg-indigo-200">
        <div className="max-w-7xl mx-auto flex gap-8">
          <div className="flex flex-col">
          <p className=" text-xs text-white">КАТЕГОРИЯ</p>
          <div className=" text-indigo-500 flex items-center font-bold">
            Все категории
            <span className="material-symbols-rounded font-bold">expand_more</span>
          </div>
        </div>
        <div className="flex flex-col">
          <p className=" text-xs text-white">ДАТА</p>
          <div className=" text-indigo-500 flex items-center font-bold">
            За все время
            <span className="material-symbols-rounded font-bold">expand_more</span>
          </div>
        </div>
        <div className="flex flex-col">
          <p className=" text-xs text-white">СОРТИРОВАТЬ</p>
          <div className=" text-indigo-500 flex items-center font-bold">
            По популярности
            <span className="material-symbols-rounded font-bold">expand_more</span>
          </div>
        </div>
        </div>
        
      </div>
      <div className=" max-w-7xl mx-auto ">
        <p className="my-4 text-2xl font-light">СПИСОК МОДЕЛЕЙ</p>
        <div className=" grid grid-cols-3 gap-1">
          {arr.map((item, index) => (
            <ProductItem key={index} product={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
