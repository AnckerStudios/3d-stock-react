import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import { selectIsAuth } from "./redux/slices/auth";

const Root = () => {
  // const isAuth = useSelector(selectIsAuth);
  // if(!isAuth){
  //   return <Navigate to="/login"/>
  // }
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Root;
