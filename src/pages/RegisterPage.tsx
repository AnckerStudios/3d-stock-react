import { SubmitHandler, useForm } from "react-hook-form";
import { IUser, Inputs, RegisterForm } from "../models/user";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import { fetchRegister, fetchUser, selectIsAuth } from "../redux/slices/auth";
import { Link, Navigate } from "react-router-dom";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<RegisterForm>();

  const isAuth = useSelector(selectIsAuth);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<RegisterForm> = async (inputs) => {
    const data = await dispatch(fetchRegister(inputs));
    if (!data.payload) {
      return console.log("Не удалось зарегестрироваться");
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
      <p className="text-center font-light text-3xl">Регистрация</p>
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
        <p className=" font-light text-xl ">Имя</p>
        <input
          className="border rounded-lg p-2 px-4 w-full"
          {...register("firstname", { required: "Укажите Ваше имя" })}
          placeholder="firstname"
        />
      </div>
      {errors.firstname?.message}
      <div className="flex flex-col gap-2">
        <p className=" font-light text-xl ">Фамилия</p>
        <input
          className="border rounded-lg p-2 px-4 w-full"
          {...register("lastname", { required: "Укажите Вашу фамилию" })}
          placeholder="lastname"
        />
      </div>
        {errors.lastname?.message}
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
      <button type="submit" className=" mt-4 border rounded-lg bg-indigo-300 p-2 px-4 w-full text-white font-bold">Зарегистрироваться</button>
      <Link to={'/login'} className="   px-4 w-full text-indigo-400 text-center">или войти</Link>
    </form>
  </div>
  );
};

export default RegisterPage;
