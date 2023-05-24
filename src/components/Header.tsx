import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { getUser, logout, setBalance } from "../redux/slices/auth";
import { ROLE } from "../models/user";
import axios from "../axios";

const Header = () => {
  const dispatch = useDispatch();

  const user = useSelector(getUser);
  if (!user) {
  }

  const onClickLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };
  const onAddBalance = () => {
    axios
      .get("http://localhost:8080/api/user/addBalance")
      .then((res) => {
        console.log("requst", res);
        dispatch(setBalance(res.data));
      });
  };
  return (
    <div className=" sticky top-0 z-20 w-full h-16 p-3 bg-indigo-400 flex border-b border-white justify-between items-center">
      <Link to={"/feed"}>
        <p className=" text-white font-bold text-xl"> 3D STOCk</p>
      </Link>
      <div className="h-full border rounded-lg border-indigo-200 bg-indigo-300 flex item-center ">
        <span className="material-symbols-rounded p-2 border-r border-indigo-200 text-white">
          search
        </span>
        <input className=" h-full bg-transparent w-80" />
      </div>
      <div className="flex gap-2 h-full">
        {!user && (
          <Link
            to={"/login"}
            className="py-2 px-4 bg-white rounded-lg text-indigo-500 font-bold flex items-center gap-1"
          >
            <p>ВОЙТИ</p>
            <span className="material-symbols-rounded font-bold">login</span>
          </Link>
        )}
        {user && (
          <div className="flex items-center gap-2">
            {user.role == "MODER" && (
              <Link
                className="py-2 px-4 bg-white rounded-lg text-indigo-500 font-bold"
                to={`/upload`}
              >
                ПРОВЕРИТЬ
              </Link>
            )}
            <Link
              className="py-2 px-4 bg-white rounded-lg text-indigo-500 font-bold"
              to={`/upload`}
            >
              ЗАГРУЗИТЬ
            </Link>
            <div className="h-10 w-10 group relative ">
              <Link to={`/${user.email}`}>
                <img
                  src={user.img ?? "noimg.png"}
                  className="absolute z-50 rounded-full h-10 top-0 right-0"
                />
              </Link>
              <div className=" invisible  w-48 absolute -top-2 -right-2 group-hover:visible bg-white p-2  rounded-md border shadow">
                <div className="h-10 flex flex-col px-1">
                  <Link to={`/${user.email}`} className="cursor-pointer">
                    {user.email}
                  </Link>
                  <p className=" text-xs text-indigo-400">
                    {user.firstname} {user.lastname}
                  </p>
                </div>
                <div className="my-2 border w-full"></div>
                <div className="px-1 flex flex-col">
                  <p className=" text-xs text-indigo-500">Мой баланс:</p>
                  <div className="flex justify-between">
                    <p className="">{user.balance ?? "0"} ₽</p>
                    
                      <span className="material-symbols-rounded text-white font-bold select-none cursor-pointer bg-indigo-300 rounded-md " onClick={onAddBalance}>add</span>
                    
                  </div>
                </div>
                <div className="my-2 px-1 border w-full"></div>
                <Link
                  to={"/setting"}
                  className="flex items-center gap-2 px-1 select-none hover:text-indigo-500"
                >
                  <p>Настройки</p>
                </Link>
                <Link
                  to={"/upload"}
                  className="flex items-center gap-2 px-1 select-none hover:text-indigo-500"
                >
                  <p>Загрузить</p>
                </Link>
                <div className="my-2 px-1 border w-full"></div>
                <button
                  className="flex items-center gap-2 px-1 select-none hover:text-indigo-500"
                  onClick={onClickLogout}
                >
                  <p>Выход</p>
                  <span className="material-symbols-rounded font-bold">
                    logout
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
