import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/slices/auth";

const Header = () => {
  const dispatch = useDispatch();
  const onClickLogout = () => {
    dispatch(logout());
  };

  return (
    <div className=" sticky top-0 z-20 w-full h-16 p-3 bg-indigo-400 flex border-b border-white justify-between items-center">
      <p className=" text-white font-bold text-xl"> 3D STOCk</p>
      
        <div className="h-full border rounded-lg border-indigo-200 bg-indigo-300 flex item-center ">
          <span className="material-symbols-rounded p-2 border-r border-indigo-200 text-white">search</span>
          <input className=" h-full bg-transparent w-80" />
        </div>
  

      {/* <button onClick={onClickLogout}>Logout</button> */}
      <div className="flex gap-2 h-full">
        <Link
          className="py-2 px-4 bg-white rounded-lg text-indigo-500 font-bold"
          to={`/upload`}
        >
          ЗАГРУЗИТЬ
        </Link>
        {/* <button className="py-2 px-6 bg-white rounded-lg text-indigo-500 font-bold">Войти</button> */}
        <img
          src="https://placekitten.com/500/500"
          className=" rounded-full h-full"
        />
      </div>
    </div>
  );
};

export default Header;
