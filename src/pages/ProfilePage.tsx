import { useEffect, useState } from "react";
import ProductItem from "../components/productItem";
import { getMyModels, getProfile, getUserModels } from "../data/models";
import { IOption, IProduct } from "../models/product";
import { useSelector } from "react-redux";
import { getUser } from "../redux/slices/auth";
import { Link, useLoaderData } from "react-router-dom";
import { IUser } from "../models/user";
import MiniSelect from "../components/MiniSelect";

export async function loader({ params }: any) {
  console.log("jjj", params);

  const profile = await getProfile(params.userId);
  return { profile };
}

const ProfilePage = () => {

  const { profile } = useLoaderData() as { profile: IUser };
  const [arr, setArr] = useState<IProduct[]>([]);
  const user = useSelector(getUser);

  const [status, setStatus] = useState('all');

  useEffect(() => {
    console.log(status);
    if(user?.email === profile.email){
      getMyModels(status).then((item) => {
        setArr(item);
        console.log(item);
      });
    }else{
    getUserModels(profile.email).then((item) => {
      setArr(item);
      console.log(item);
    });
  }
  }, [status]);
  const options: IOption[] = [
    {
      id: 1,
      name: "Все",
      action: () => {
        console.log("All");
        setStatus('all')
      },
    },
    {
      id: 2,
      name: "Черновики",
      action: () => {
        console.log("Опубликованные");
        setStatus('draft')
      },
    },
    {
      id: 3,
      name: "Опубликованные",
      action: () => {
        console.log("Опубликованные");
        setStatus('valid')
      },
    },
    {
      id: 4,
      name: "Выставленные",
      action: () => {
        console.log("Draft");
        setStatus('wait')
      },
    },
    {
      id: 5,
      name: "Отказанные",
      action: () => {
        console.log("nn");
        setStatus('invalid')

      },
    },
  ];
  return (
    <>
      <div className="w-full bg-indigo-200 p-4">
        <div className=" max-w-7xl  mx-auto flex gap-4">
          <div className="w-40">
            <img
              src={profile.img ?? '/noimg.png'}
              className=" rounded-md w-full"
            />
          </div>
          <div className=" flex-grow">
            <p className=" text-7xl font-light">{profile.email}</p>
            <p className=" text-3xl font-bold  text-indigo-600">
              {profile.firstname} {profile.lastname}
            </p>
          </div>

          {user?.email === profile.email && <div className=" ">
            <Link to={'/setting'} className="bg-white px-6 py-2 rounded-md text-indigo-400 font-bold text-2xl">
              РЕДАКТИРОВАТЬ
            </Link>
          </div>}
        </div>
      </div>
      <div className=" max-w-7xl  mx-auto">
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <p className="my-4 text-2xl font-light">
              {user?.email === profile.email ? 'МОИ МОДЕЛИ' : `МОДЕЛИ ${profile.email.toUpperCase()}`}
            </p>
            {user?.email === profile.email && <MiniSelect title={'Статус'} options={options}/>}
          </div>
          <div className="grid grid-cols-3 gap-1">
            {arr.length ? arr.map((item, index) => (
              <ProductItem key={index} product={item} statusView={user?.email === profile.email}/>
            )) : <p>Моделй пока нет</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
