import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import React, { Suspense, useEffect } from 'react';
import Test3DView from '../components/test3DView';
import { LoadingScreen } from '../components/LoadingScreen';
import { Link, Params, useLoaderData } from 'react-router-dom';
import { LoadingScreen2 } from '../components/LoadingScreen2';
import { getModel } from '../data/models';
import { IProduct } from '../models/product';
import { useProgress } from '@react-three/drei';
import * as THREE from 'three'
import { useSelector } from 'react-redux';
import { getUser } from '../redux/slices/auth';


export async function loader({ params }: any) {
  console.log("jjj", params);

  const product = await getModel(params.productId);
  return { product };
}

function ProductPage() {
  const {product} = useLoaderData() as {product:IProduct};
   const progress = useProgress();

   useEffect(()=>{
   
    console.log("k",progress);
    
   },[progress])

  function ddd() {
    console.log("loadddd")
    return <LoadingScreen2 />
  }
  return (

    <>
      <div className=' max-w-7xl mx-auto '>
        <div className='aspect-video mt-10 relative '>

          <Canvas shadows className=' rounded-xl ' style={{background: product.background}}>
          <color
                attach="background"
                args={[product.background as THREE.ColorRepresentation]}
              />
            <Suspense fallback={null}>
              {product && <Test3DView url={product.id} />}

            </Suspense>



          </Canvas>
          <LoadingScreen />
          {/* <LoadingScreen /> */}
          {/* {progress} */}
        </div>
        <div className='w-full flex mt-4 gap-2'>
            <div className=' flex-grow flex flex-col gap-4'>
              <p className=' text-4xl font-light'>{product.name}</p>
              <div className=' border rounded-lg  pt-4'>
                <div className='flex gap-6 border-b pb-2 px-8'>
                  <p className='w-36 text-lg border-b-4 pb-2 border-indigo-400 text-center'>Описание</p>
                  <p className='w-36 text-lg text-center pb-2'>Комментарии</p>
                </div>
                <p className='p-2 px-8'>{product.description}</p>
              </div>
            </div>
            <div className=' border  rounded-lg  w-80'>
              <div className='border-b p-4 gap-2 flex flex-col justify-center'>
                <p className=' text-4xl font-bold text-indigo-400 text-center'>{product.price} ₽ </p>
                <a href={`http://localhost:8080/api/model/file/${product.id}`} download className='py-2 bg-indigo-400 rounded-xl text-white'>Приобрести</a>
              </div>
              <div className='border-b p-4 flex gap-2'>
                <img src={product.user.img ?? "noimg.png"} className=" rounded-full h-20" />
                <p className=' text-xl font-bold'>{product.user.email}</p>
              </div>
              <div className=' p-4 flex flex-col gap-2'>
                <p className=' text-xl font-light'>Информация о модели</p>
                <div className='pt-1 border-b flex justify-between'>
                  <p>Дата публикации</p>
                  <p>{product.publicDate}</p>
                </div>
                <div className='pt-1 border-b flex justify-between'>
                  <p>Анимация</p>
                  <p>{product.animated ? 'Да' : 'Нет'}</p>
                </div>
                <div className='pt-1 border-b flex justify-between'>
                  <p>Текстуры</p>
                  <p>{product.textures ? 'Да' : 'Нет'}</p>
                </div>
                <div className='pt-1 border-b flex justify-between'>
                  <p>Полигонов</p>
                  <p>{product.polygonCount}</p>
                </div>
                
              </div>
            </div>
        </div>
        
      </div>
      {/* <div className="absolute w-screen h-screen top-0 left-0 bg-black/50 z-30">
        <div className=" w-[500px]  bg-white rounded-xl mx-auto mt-40 p-4 shadow">
            <p  className=" font-light text-3xl mb-4">Покупка модели</p>
            <div className="flex gap-2">
                <p className=" font-light text-xl ">Шахматная доска</p>
            </div>
            <div className='pt-1 border-b flex justify-between'>
                  <p>Анимация</p>
                  <p>Нет</p>
                </div>
                <div className='pt-1 border-b flex justify-between'>
                  <p>Текстуры</p>
                  <p>Да</p>
                </div>
                <div className='pt-1 border-b flex justify-between'>
                  <p>Полигонов</p>
                  <p>3243</p>
                </div>
                <div className='pt-1 border-b flex justify-between'>
                  <p>Цена</p>
                  <p>100 ₽</p>
                </div>
            
            <button className=" mt-4 border rounded-lg bg-indigo-300 p-2 px-4 w-full text-white font-bold">Приобрести</button>
        </div>
      </div> */}
      {/* <div className="absolute w-screen h-screen top-0 left-0 bg-black/50 z-30">
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
                  <p className=" font-light text-xl ">GLFT 2.0</p>
                  <button className=" border rounded-lg bg-indigo-300 p-2 px-4 w-40 text-white font-bold">Скачать .glft</button>
                </div>
               
            
          
        </div>
      </div> */}
    </>
  )
}

export default ProductPage
