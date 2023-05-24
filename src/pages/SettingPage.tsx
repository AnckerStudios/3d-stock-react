import { useSelector } from "react-redux";
import { getUser, setUserInf } from "../redux/slices/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserInformation } from "../models/user";
import {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import axios from "../axios";
import { useAppDispatch } from "../redux/store";

const SettingPage = () => {
  const user = useSelector(getUser);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<UserInformation>({
    defaultValues: {
      firstname: user?.firstname,
      lastname: user?.lastname,
    },
  });
  const img = watch("image");
 
  useEffect(() => {
    console.log("kdsgfas", watch("image"));
    if (watch("image")[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(watch("image")[0]);
      reader.onload = () => {
        console.log(reader.result);
        setImage(reader.result?.toString());
      };
    }
  }, [watch("image")]);
  const save = () => {
    
  };
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<UserInformation> = async (inputs) => {
    console.log(inputs);
    console.log();
    let formData = new FormData();

    formData.append("image", inputs.image[0], inputs.image[0].name);
    formData.append("firstname", inputs.firstname);
    formData.append("lastname", inputs.lastname);

    console.log("formData", formData.get("image"));

    axios
      .post("http://localhost:8080/api/model/img", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("requst", res);
        dispatch(setUserInf(res.data))
      });
  };

  return (
    <div className=" max-w-2xl  mx-auto flex gap-4 flex-col">
     
      {/* <div className="w-40">
        
        <button
          className="p-2 px-4 bg-slate-300 rounded-md"
          onClick={() => inputRef.current?.click()}
        >
          UPLOAD
        </button>
        <button className="p-2 px-4 bg-slate-300 rounded-md" onClick={save}>
          SAVE
        </button>
        <input
          ref={inputRef}
          type="file"
          multiple
          hidden
          onChange={(e) => onChangeImage(e.target.files![0])}
        />
      </div>
      <div>
        <input />
      </div> */}

      <div className="">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col gap-4 rounded-xl border w-[500px] mx-auto mt-20 p-4 bg-white"
        >
             <p className="text-center font-light text-2xl">ИНФОРМАЦИЯ О ПРОФИЛЕ {user?.email.toUpperCase()}</p>

          <div className="flex flex-col gap-2">
            <p className=" font-light text-xl ">Фотография</p>
            <div className="flex gap-4">
              <img
                src={image ?? user?.img ?? 'noimg.png'}
                className=" rounded-md w-40"
              />
              <div>
              <input
              type="file"
              
              className="border rounded-lg p-2 px-4 w-full"
              {...register("image")}
              placeholder="E-mail"
            />
              </div>
              
              
            </div>

            
          </div>
          <div className="flex flex-col gap-2">
            <p className=" font-light text-xl ">Имя</p>
            <input
              className="border rounded-lg p-2 px-4 w-full"
              {...register("firstname", { required: "Укажите E-mail" })}
              placeholder="E-mail"
            />
          </div>
          {errors.firstname?.message}
          <div className="flex flex-col gap-2">
            <p className=" font-light text-xl ">Фамилия</p>
            <input
              className="border rounded-lg p-2 px-4 w-full"
              {...register("lastname", { required: "Укажите E-mail" })}
              placeholder="E-mail"
            />
          </div>
          {errors.lastname?.message}
          <button
            type="submit"
            className="p-2 px-4 bg-slate-300 rounded-md"
            
          >
            SAVE
          </button>
        </form>

        {/* <p className=" text-3xl font-bold  text-indigo-600">
          {user?.firstname} {user?.lastname}
        </p> */}
      </div>
    </div>
  );
};

export default SettingPage;
