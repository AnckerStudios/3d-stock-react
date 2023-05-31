import { Suspense, useEffect, useState } from "react";
import ProductItem from "./components/productItem";
import { IProduct } from "./models/product";
import { Canvas } from "@react-three/fiber";
import Test3DView from "./components/test3DView";
import { Environment, Loader } from "@react-three/drei";
import { categories, getAllModels } from "./data/models";
import MiniSelect from "./components/MiniSelect";
import Ssd from "./components/ssd";

function App() {
  const [count, setCount] = useState(0);
  const [arr, setArr] = useState<IProduct[]>([]);
  useEffect(() => {
    getAllModels().then((x) => {
      console.log("X", x);

      setArr(x);
    });
  }, []);

  return (
    <>
      <div className="  w-full p-3 bg-indigo-200">
        <div className="max-w-7xl mx-auto flex gap-8">
          <MiniSelect title={'Категория'} options={categories}/>
          <div className="flex flex-col">
            <p className=" text-xs text-white">ДАТА</p>
            <div className=" text-indigo-500 flex items-center font-bold">
              За все время
              <span className="material-symbols-rounded font-bold">
                expand_more
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <p className=" text-xs text-white">СОРТИРОВАТЬ</p>
            <div className=" text-indigo-500 flex items-center font-bold">
              По популярности
              <span className="material-symbols-rounded font-bold">
                expand_more
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className=" max-w-7xl mx-auto ">
        <p className="my-4 text-2xl font-light">СПИСОК МОДЕЛЕЙ</p>
        <div className=" grid grid-cols-3 gap-1">
          {arr.length ? arr.map((item, index) => ( 
            item.name !== 'lamp' && <ProductItem key={index} product={item} statusView={false}/>
          )) : 
          <p>Пока нет моделей</p>
          }
          {/* <Ssd/>
          <Ssd/>
          <Ssd/>
          <Ssd/>
          <Ssd/>
          <Ssd/>
          <Ssd/>
          <Ssd/>
          <Ssd/>
          <Ssd/>
          <Ssd/> */}
        </div>
      </div>
    </>
  );
}

export default App;
