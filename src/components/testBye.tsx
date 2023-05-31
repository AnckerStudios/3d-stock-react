import { useState } from "react";
import { IProduct } from "../models/product";

interface TestBuyProps {
  product: IProduct;
}
const TestBuy = ({ product }: TestBuyProps) => {
    const [a,setA] = useState<boolean>(false);
  return (
    <div className="absolute w-screen h-screen top-0 left-0 right-0 bottom-0 bg-black/50 z-30">
      {!a?<div className=" w-[500px]  bg-white rounded-xl mx-auto mt-40 p-4 shadow">
        <div className="flex justify-between items-center">
        <p className=" font-light text-3xl mb-4">Покупка модели</p>
        <p>28/05/23</p>
        </div>
       
        <div className="flex gap-2">
          <p className=" font-light text-2xl ">Шахматная доска</p>
        </div>
        <img src={product.img} className=" aspect-video rounded-md mb-2"/>
        <div className="py-1 border-b flex justify-between">
          <p>Автор</p>
          <p>admin (Илья Ермолин)</p>
        </div>
        <div className="py-1 border-b flex justify-between">
          <p>Анимация</p>
          <p>Нет</p>
        </div>
        <div className="py-1 border-b flex justify-between">
          <p>Текстуры</p>
          <p>Да</p>
        </div>
        <div className="py-1 border-b flex justify-between">
          <p>Полигонов</p>
          <p>92628</p>
        </div>
        <div className="py-1 border-b flex justify-between">
          <p>Размер файла</p>
          <p>81 Мб</p>
        </div>
        <div className="py-1 border-b flex justify-between">
          <p>Цена</p>
          <p>150 ₽</p>
        </div>
        <p className=" text-center mt-2">Ваш балланс: <span className=" text-indigo-600 font-bold">500 ₽</span></p>
        <p className=" text-center text-xl">После покупки останется: <span className=" text-indigo-600 font-bold">350 ₽</span></p>
        <div className="flex gap-2">
        <button className=" mt-4 border rounded-lg bg-gray-300 p-2 px-4 w-full  font-bold">
          Отмена
        </button>
        <button onClick={()=>setA(true)} className=" mt-4 border rounded-lg bg-indigo-400 p-2 px-4 w-full text-white font-bold">
          Приобрести за 150 ₽
        </button>
        </div>
      </div> : 
      <div className=" w-[500px]  bg-white rounded-xl mx-auto mt-40 p-4 shadow">
      <p  className=" font-light text-3xl mb-4">Скачивание</p>
      <div className="flex gap-2">
          <p className=" font-light text-xl ">Выберете нужный формат 3D-модели</p>
      </div>
      <div>

      </div>
          <div className='p-1 border-b flex justify-between items-center'>
            <p className=" font-light text-xl ">OBJ</p>
            <button className=" border rounded-lg bg-indigo-300 p-2 px-4 w-40 text-white font-bold">Скачать .obj</button>
          </div>
          <div className='p-1 border-b flex justify-between items-center'>
            <p className=" font-light text-xl ">FBX</p>
            <button className=" border rounded-lg bg-indigo-300 p-2 px-4 w-40 text-white font-bold">Скачать .fbx</button>
          </div>
          <div className='p-1 border-b flex justify-between items-center'>
            <p className=" font-light text-xl ">GLB</p>
            <button className=" border rounded-lg bg-indigo-300 p-2 px-4 w-40 text-white font-bold">Скачать .glb</button>
          </div>
         
      
    
  </div>}
    </div>
  );
};

export default TestBuy;
