import { useLoaderData } from "react-router-dom";
import { getCategories } from "../data/models";
import { ICategory } from "../models/product";
import axios from "../axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const CategoryPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<ICategory>();
  const [editRecord, setEditRecord] = useState<ICategory | null>(null);
  const onSubmit: SubmitHandler<ICategory> = async (category) => {
    console.log("category", category);

    axios.post("/api/category", category).then((res) => {
      console.log("+", res);
      setCategories([...categories.filter(x=>x.id!==res.data.id), res.data].sort((x,y)=>x.name.localeCompare(y.name)));
      setValue("id", undefined);
      setValue("name",'');
    });
  };
  const delClick = (id: string) => {
    axios.delete(`/api/category/${id}`).then((res) => {
      console.log("+", res);
      setCategories(categories.filter((x) => x.id !== id));
    });
  };

  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    axios.get(`/api/category`).then((res) => {
      setCategories((res.data as ICategory[]).sort((x,y)=>x.name.localeCompare(y.name)));
    });
  }, []);

  return (
    <div className=" max-w-2xl mx-auto flex flex-col gap-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col gap-4 mt-8  "
      >
        <p className=" text-3xl font-light ">Добавление категории :</p>
        <div className="flex">
          <input
            className="border border-indigo-400 rounded-l-lg p-2 px-4 w-full bg-transparent outline-none"
            {...register("name", { required: "Укажите название категории" })}
            placeholder="Название категории"
          />
          <button
            type="submit"
            className={`px-8 rounded-r-lg border-y border-r transition font-bold border-indigo-400 ${
              watch("name")
                ? "bg-indigo-300 text-white"
                : "bg-indigo-100 text-indigo-300"
            } `}
          >
            Добавить
          </button>
        </div>
        {errors.name?.message}
      </form>
      {categories.length ? (
        <div className=" flex flex-col gap-4">
          <p className=" text-3xl font-light ">Категории :</p>
          {categories.map((x,i) => (
            <div className="  flex">
              {x.id === editRecord?.id ? (
                <>
                  
                      <input
                        className="px-6 border h-16 flex-grow border-indigo-400 rounded-l-lg bg-indigo-400 text-white font-bold outline-none focus:border-4 focus:border-indigo-600"
                        value={editRecord?.name}
                        onChange={(e) =>
                          setEditRecord({
                            ...editRecord!,
                            name: e.target.value,
                          })
                        }
                      />

    
                  <span
                    onClick={() => {
                      onSubmit(editRecord!);
                      setEditRecord(null);
                    }}
                    className="material-symbols-rounded p-3 px-4 h-16 hover:bg-indigo-400 bg-indigo-300 rounded-r-lg border-y border-r border-indigo-400 text-white font-bold text-3xl cursor-pointer"
                  >
                    edit_square
                  </span>
                </>
              ) : (
                <>
                  <div className=" flex flex-col flex-grow bg-indigo-300 border h-16 border-indigo-400 rounded-l-lg p-2">
                    <p className="px-4  text-white font-bold text-xl">
                      {x.name}
                    </p>
                    <p className="px-4  text-indigo-700 text-sm">
                      {x.name === 'Машины'? 0 : x.name === 'Мебель' ? 1 : i } моделей
                    </p>
                  </div>
                  <span
                    onClick={() => setEditRecord(x)}
                    className="material-symbols-rounded p-3 px-4 h-16 hover:bg-indigo-400 bg-indigo-300 border-y border-indigo-400  text-white font-bold text-3xl cursor-pointer"
                  >
                    edit_square
                  </span>
                  <span
                    onClick={() => delClick(x.id!)}
                    className="material-symbols-rounded p-3 px-4 h-16 hover:bg-indigo-400 bg-indigo-300 rounded-r-lg border border-indigo-400 text-white font-bold text-3xl cursor-pointer"
                  >
                    delete
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>Категорий нет</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
