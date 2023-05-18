import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, selectIsAuth } from "../redux/slices/auth";
import { IUser, Inputs } from "../models/user";
import { useAppDispatch } from "../redux/store";
import { Link, Navigate } from "react-router-dom";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Inputs>();
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<Inputs> = async (inputs) => {
    const data = await dispatch(fetchUser(inputs));
    if (!data.payload) {
      return console.log("Не удалось авторизоваться");
    }
    if ((data.payload as IUser)?.token) {
      window.localStorage.setItem("token", (data.payload as IUser).token);
    }
  };
  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col gap-4 rounded-xl border w-[500px] mx-auto mt-20 p-4"
      >
        <p className="text-center font-light text-3xl">Вход</p>
        <div className="flex flex-col gap-2">
          <p className=" font-light text-xl ">Почта</p>
          <input
            className="border rounded-lg p-2 px-4 w-full"
            {...register("email", { required: "Укажите E-mail" })}
            placeholder="E-mail"
          />
        </div>
        {errors.email?.message}
        <div className="flex flex-col gap-2">
          <p className=" font-light text-xl ">Пароль</p>
          <input
          type="password"
          className="border rounded-lg p-2 px-4 w-full"
          {...register("password", { required: "Укажите пароль" })}
          placeholder="Пароль"
        />
        </div>
        
        {errors.password?.message}
        <button type="submit" className=" mt-4 border rounded-lg bg-indigo-300 p-2 px-4 w-full text-white font-bold">Войти</button>
        <Link to={'/register'} className="   px-4 w-full text-indigo-400 text-center">или зарегистрироваться</Link>
      </form>
    </div>
  );
};

export default LoginPage;
