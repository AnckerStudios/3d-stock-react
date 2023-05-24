import { useState } from "react";
import { IOption } from "../models/product";

interface MSProps {
  title: string;
  options: IOption[];
}

const MiniSelect = ({ title, options }: MSProps) => {
  
  const [select, setSelect] = useState<IOption>(options[0]);
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="flex flex-col relative w-44 h-8">
      <div className=" absolute z-30 w-44 select-none">
        <p className=" text-xs ">{title.toUpperCase()}</p>
        <div
          className=" text-indigo-500 flex items-center font-bold relative cursor-pointer"
          onClick={() => setOpen(!isOpen)}
        >
          {select.name}
          <span className="material-symbols-rounded font-bold">
            expand_more
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="absolute transition -top-1 -left-2 z-20 pt-12 bg-white rounded-md shadow p-2 w-full">
            <div className="border w-full"></div>
          {options.map((item) => (
            item.id != select.id && <p className="select-none cursor-pointer" key={item.id} onClick={()=>{
                setSelect(item); 
                setOpen(false);
                item.action();
            }}>{item.name}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default MiniSelect;
