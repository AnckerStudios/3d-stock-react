import { useLoaderData } from "react-router-dom";
import { getModel } from "../data/models";
import { IProduct } from "../models/product";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { LoadingScreen } from "../components/LoadingScreen";
import Test3DView from "../components/test3DView";
import { Environment } from "@react-three/drei";
import { useForm } from "react-hook-form";
import axios from "../axios";
import {
  ChromePicker,
  Color,
  ColorChangeHandler,
  ColorResult,
  SketchPicker,
} from "react-color";
import { ColorRepresentation } from "three";

export async function loader({ params }: any) {
  console.log("jjj", params);

  const model = await getModel(params.productId);
  return { model };
}

const ModelProperty = () => {
  const { model } = useLoaderData() as { model: IProduct };
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<IProduct>({
    defaultValues: model,
  });
  const convasRef = useRef<HTMLCanvasElement | null>(null);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [modelFile, setModelFile] = useState<string | undefined>(undefined);
  const [colorState, setColorState] = useState<boolean>(false);
  // console.log(/^#(?:[A-Fa-f0-9]{3}){1,2}$/.test('#221222'));
  const screenImage = () => {
    setImage(convasRef.current?.toDataURL());
  };

  const setBgColor = (color: ColorResult) => {
    setValue("background", color.hex);
  };
  const saveModel = (status: boolean) => {
    let formData = new FormData();
    if (image) {
      let blobBin = atob(image!.split(",")[1]);
      let array = [];
      for (let i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
      }
      let file = new Blob([new Uint8Array(array)], { type: "image/png" });
      formData.append("image", file, "dss.png");
    }
    // formData.append("model", '');
    console.log(getValues());

    formData.append(
      "info",
      new Blob([JSON.stringify(getValues())], {
        type: "application/json",
      })
    );

    console.log("formData", formData.get("info"));

    axios
      .post("http://localhost:8080/api/model/save/" + status, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("requst", res);
      });
  };
  return (
    <div className=" max-w-7xl mx-auto py-4 flex flex-col gap-4">
      <div className="flex gap-4">
        <p className="rounded-md bg-gray-400 px-6 py-1 text-white font-bold text-4xl w-fit">
          ЧЕРНОВИК
        </p>
        <p className="text-4xl font-light">
          {(watch("name") ?? "Безымянный проект").toUpperCase()}
        </p>
      </div>
      <div className="flex gap-4">
        <div className="w-80 flex flex-col gap-4">
          <p className=" text-xl font-light">Изображение модели</p>
          <div className=" aspect-video relative">
            <img
              src={image ?? model.img ?? "/noimg.png"}
              className="aspect-video rounded-md w-full object-cover"
              onClick={screenImage}
            />
            <span className="material-symbols-rounded absolute bottom-1 right-1 text-white">
              ads_click
            </span>
          </div>
          <p className=" text-xl font-light">Категория модели</p>
          <select className=" w-full rounded-lg bg-transparent font-bold border border-indigo-500 p-2 text-indigo-500" defaultValue={1}>
            <option value={1} selected={false}>Выберите категорию</option>
          </select>
          <div className="  flex flex-col gap-2">
            <p className=" text-xl font-light">Информация о модели</p>
            <div className="pt-1 pb-3 border-b flex justify-between">
              <p className=" text-lg">Дата публикации</p>
              <p className=" text-lg">—</p>
            </div>
            <div className="pt-1 pb-3 border-b flex justify-between">
              <p className=" text-lg">Анимация</p>
              <div className="relative flex cursor-pointer items-center rounded-full">
                <input
                  type="checkbox"
                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-indigo-400 checked:bg-indigo-400 checked:before:bg-indigo-400 hover:before:opacity-10"
                  {...register("animated")}
                />
                <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-width="1"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="pt-1 pb-3 border-b flex justify-between">
              <p className=" text-lg">Текстуры</p>
              <div className="relative flex cursor-pointer items-center rounded-full">
                <input
                  type="checkbox"
                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-indigo-400 checked:bg-indigo-400 checked:before:bg-indigo-400 hover:before:opacity-10"
                  {...register("textures")}
                />
                <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-width="1"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="pt-1 pb-3 border-b flex justify-between">
              <p className=" text-lg">Полигонов</p>
              <input
                type="number"
                {...register("polygonCount")}
                className=" bg-transparent rounded-md border w-24 text-end text-lg"
              />
            </div>
            <div className="pt-1 pb-3 flex justify-between">
              <p className=" text-lg">Размер файла</p>
              <p className=" text-lg">{(watch("size")/(1024*1024)).toFixed(1)} Мб</p>
            </div>
          </div>
          <button className=" bg-indigo-400 rounded-md px-6 py-2 text-white font-bold">
            ЗАГРУЗИТЬ НОВУЮ МОДЕЛЬ
          </button>
        </div>
        <div className="flex-grow flex flex-col gap-4">
          <div className="aspect-video  relative ">
            <Canvas
              gl={{
                preserveDrawingBuffer: true,
              }}
              ref={convasRef}
              shadows
              className=" rounded-xl " style={{background: watch("background")}}
            >
              <color
                attach="background"
                args={[watch("background") as ColorRepresentation]}
              />
              
              <Suspense fallback={null}>
                {model && <Test3DView url={model.id} />}
              </Suspense>
            </Canvas>
            <LoadingScreen />
            <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
              <div className="p-1 rounded-md  border w-fit bg-white">
                <div
                  className={`w-10 h-4 rounded `}
                  style={{ background: `${watch("background")}` }}
                  onClick={() => setColorState(!colorState)}
                ></div>
              </div>
              {colorState ? (
                <div>
                  <SketchPicker
                    color={watch("background") ?? "#fff"}
                    onChange={setBgColor}
                  />
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 flex-grow">
              <p className=" font-light text-xl ">Название</p>
              <input
                className="border rounded-lg p-2 px-4 w-full"
                {...register("name", { required: "Укажите логин" })}
                placeholder="Название"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className=" font-light text-xl ">Цена в ₽</p>
              <input
                className="border rounded-lg p-2 px-4 w-full"
                {...register("price", { required: "Укажите логин" })}
                placeholder="Цена"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className=" font-light text-xl ">Описание</p>
            <textarea
              className="border rounded-lg p-2 px-4 w-full h-56"
              {...register("description", { required: "Укажите логин" })}
              placeholder="Описание"
            />
          </div>
          <div className="flex gap-4 justify-end">
            <button
              className=" rounded-md bg-gray-500 text-white font-bold px-4 py-2"
              onClick={() => saveModel(false)}
            >
              Сохранить изменения
            </button>
            <button
              className=" rounded-md bg-indigo-500 text-white font-bold px-4 py-2"
              onClick={() => saveModel(true)}
            >
              Опубликовать модель
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelProperty;
