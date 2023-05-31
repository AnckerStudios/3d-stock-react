import { useEffect, useState } from "react";
import { getAllModels } from "../data/models";
import { IProduct } from "../models/product";

const BuyPage = () => {
  const [arr, setArr] = useState<IProduct[]>([]);
  useEffect(() => {
    getAllModels().then((x) => {
      console.log("X", x);

      setArr(x);
    });
  }, []);
  return (
    <div className=" max-w-4xl mx-auto flex flex-col gap-4">
        <p className="text-2xl font-light my-2">Мои приобретенные модели</p>
      {arr.slice(0,3).map((x) => (
        <div className="border rounded-lg h-40 p-2 flex border-indigo-200 gap-2">
          <div className=" aspect-video h-full rounded-md bg-slate-200">
            <img src={x.img} className=" rounded-md " />
          </div>
          <div className="flex-grow flex flex-col justify-between">
            <div className="flex flex-col">
              <p>Название товара:</p>
              <p className=" text-xl">{x.name}</p>
            </div>
            <div>
              <div className="flex flex-col">
                <p>Автор товара:</p>
                <div className="flex gap-1">
                  <img
                    src={x.user.img ?? "noimg.png"}
                    className="rounded-full h-8 w-8 bg-white object-cover "
                  />
                  <p>{x.user.email}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
          <div className="flex flex-col">
              <p>Дата покупки:</p>
              <p className=" text-xl">{x.publicDate}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BuyPage;
