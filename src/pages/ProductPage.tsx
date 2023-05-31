import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import React, { Suspense, useEffect, useState } from 'react';
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
import Comments from '../components/Comments';
import TestBuy from '../components/testBye';


export async function loader({ params }: any) {
  console.log("jjj", params);

  const product = await getModel(params.productId);
  return { product };
}

function ProductPage() {
  const [buy, setBuy] = useState<boolean>(false);
  const {product} = useLoaderData() as {product:IProduct};
   const progress = useProgress();
   const user = useSelector(getUser);
  const [stage, setStage] = useState<boolean>(false);
   useEffect(()=>{
   
    console.log("k",progress);
    
   },[progress])
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
              <div className=' border rounded-lg  pt-4 bg-white'>
                <div className='flex gap-6 border-b pb-2 px-8'>
                  <button className={`w-36 text-lg pb-2 ${!stage && 'border-indigo-400 border-b-4 text-indigo-500 font-bold'}`} onClick={()=>setStage(false)}>Описание</button>
                  <button className={`w-36 text-lg pb-2 ${stage && 'border-indigo-400 border-b-4 text-indigo-500 font-bold'}`} onClick={()=>setStage(true)}>Комментарии</button>
                </div>
                <div className='p-4 px-8'>
                {stage ? <div>
                  <Comments modelId={product.id}/>
                  
                </div>:<p>{product.description} Высокополигональная модель деревянной шахматной доски <br/>Присутствуют текстуры высокого разрешения</p>}
                </div>
                
              </div>
            </div>
            <div className=' border  rounded-lg  w-80'>
              <div className='border-b p-4 gap-2 flex flex-col justify-center'>
                <p className=' text-4xl font-bold text-indigo-400 text-center'>150 ₽ </p>
                {user ? <p onClick={()=>setBuy(true)} className='py-2 bg-indigo-400 rounded-xl text-white font-bold text-center'>Приобрести</p> : 
                <div className='flex flex-col gap-2'>
                  <p>Войдите, чтобы совершить покупку</p>
                  <button className='py-2 bg-indigo-400 rounded-xl text-white font-bold'>Войти</button>
                  </div>}
                
              </div>
              <Link to={`/${product.user.email}`} className='border-b p-4 flex gap-2'>
                <img src={product.user.img ?? "noimg.png"} className=" rounded-full h-20 w-20 object-cover" />
                <p className=' text-xl font-bold'>{product.user.email}</p>
              </Link>
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
                  <p>Да</p> 
                  {/* {product.textures ? 'Да' : 'Нет'} */}
                </div>
                <div className='pt-1 border-b flex justify-between'>
                  <p>Полигонов</p>
                  <p>92628</p>
                </div>
                <div className='pt-1 border-b flex justify-between'>
                  <p>Размер файла</p>
                  <p>81 Мб</p>
                </div>
              </div>
            </div>
        </div>
        
      </div>
      {/* {buy && <TestBuy product={product}/>} */}

    </>
  )
}

export default ProductPage
