import {
  MouseEventHandler,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { IProduct } from "../models/product";
import { Link, Navigate } from "react-router-dom";
import { Html, Loader, useGLTF, useProgress } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { LoadingScreen } from "../components/LoadingScreen";
import Test3DView from "../components/test3DView";
import axios from "../axios";


interface LoadingScreenProps {
  started: boolean;
  onStarted: MouseEventHandler;
}

export const UploadPage = () => {
  const [fileList, setFileList] = useState<FileList>();
  const [model, setModel] = useState<string>();
  const [nav, setNav] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
   console.log(fileList);
   
  }, [fileList]);

  // reader.onload = function(e) {
  //     var dataURL = reader.result;
  //   }

  // reader.readAsDataURL(file);
  function click() {
    let formData = new FormData();
    if(!fileList?.length) {
      console.log("gg");
      
      return;
    }
    formData.append(
      "model",
      fileList[0],
      fileList[0].name
    );
    // for (let i = 0; i < fileList!.length; i++) {
    //   formData.append(
    //     "model",
    //     fileList!.item(i)!,
    //     fileList!.item(i)!.name
    //   );
    // }

    console.log("formData", formData.get("model"));

    axios.post("http://localhost:8080/api/model", formData).then((res) => {
      console.log("requst", res);
      setNav((res.data as IProduct).id);
      // return <Navigate to={`/property/${(res.data as IProduct).id}`}/>
    });
  }
  const files = fileList ? [...fileList] : [];
  return (
    <>
      {/* <div className=" max-w-7xl mx-auto ">
        <div className="aspect-video mt-10 relative">
          <div className="absolute z-10 top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-4 select-none cursor-pointer" onClick={()=>inputRef.current?.click()}>
            <span className="material-symbols-rounded text-[12rem] text-white ">
              upload_file
            </span>
            <p className=" font-light text-4xl text-white">
              Загрузите файлы вашей 3D-модели для продолжения
            </p>
          </div>
          <Canvas shadows className=" rounded-xl bg-indigo-300">
            <Suspense fallback={null}>
              <Test3DView url={"/testModel/4/scene.gltf"} />
            </Suspense>
          </Canvas>
          <LoadingScreen />
        </div>
        <div className=" mt-4 flex gap-4 justify-center">
          <button className="w-40 p-2 px-4 rounded-lg bg-indigo-300 text-white">
            Изменить
          </button>
          <button className="w-40 p-2 px-4 rounded-lg bg-indigo-400 text-white flex item-center justify-center">
            Далее{" "}
            <span className="font-bold material-symbols-rounded">
              chevron_right
            </span>
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          hidden
          onChange={(e) => {
            setFile(e.target.files!);
          }}
        />

        <button onClick={() => click()}>res</button>
      </div> */}

      <div className=" max-w-2xl mx-auto pt-10 flex flex-col gap-8">
        <p className=" font-light text-4xl text-indigo-500  text-center">Загрузите новую модель</p>
        <div className="aspect-video relative border-4 border-dashed border-indigo-500 rounded-lg" onClick={()=>inputRef.current?.click()}>
        <ul>
        {files.map((file, i) => (
          <li key={i}>
            {file.name} - {file.type}
          </li>
        ))}
      </ul>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          hidden
          onChange={(e) => {
            setFileList(e.target.files!);
          }}
        />
        <button className="w-40 p-2 px-4 rounded-lg bg-indigo-300 text-white" onClick={() => click()}>
            Загрузить
        </button>
        {nav && <Navigate to={`/property/${nav}`}/>}
      </div>
      {/* <div className="absolute w-screen h-screen top-0 left-0 bg-black/50 z-30">
        <div className=" w-[500px]  bg-white rounded-xl mx-auto mt-40 p-4 shadow">
            <p  className=" font-light text-3xl mb-4">Информация о модели</p>
            <div className="flex flex-col gap-2">
                <p className=" font-light text-xl ">Название</p>
                <input className=" border rounded-lg p-2 px-4 w-full" placeholder="Пончик?"/>
            </div>
            <div className="flex flex-col gap-2">
                <p className=" font-light text-xl ">Описание</p>
                <textarea className=" border rounded-lg p-2 px-4 w-full" placeholder="Красивый пончик?"/>
            </div>
            <div className="flex flex-col gap-2">
                <p className=" font-light text-xl ">Категория</p>
                <input className=" border rounded-lg p-2 px-4 w-full" placeholder="Еда?"/>
            </div>
            <div className="flex flex-col gap-2">
                <p className=" font-light text-xl ">Цена</p>
                <div className="flex gap-2 items-center">
                    <input className=" border rounded-lg p-2 px-4 w-40" placeholder="100?"/>
                    <input type="checkbox" className=" border rounded-lg p-2 px-4 " placeholder="100?"/> <p>Бесплатно?</p>
                </div>
                
            </div>
            <button className=" mt-4 border rounded-lg bg-indigo-300 p-2 px-4 w-full text-white font-bold">Далее</button>
        </div>
      </div> */}
    </>
  );
};
