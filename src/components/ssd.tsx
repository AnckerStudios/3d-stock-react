import { useState } from "react";
import { Link } from "react-router-dom";

const Ssd = () => {

    return ( 
        <div
      className=" aspect-video rounded-md relative group cursor-pointer hover:scale-110 hover:z-10 hover:shadow-2xl transition"
    >
      <Link
        to={'/feed'}
        className="transition ease-in-out delay-150 duration-300 absolute w-full h-full bg-gradient-to-t from-indigo-500 to-transparent to-40% hidden flex-col justify-end rounded-md group-hover:flex"
      >
        <div className="p-2 text-3xl font-bold text-white">{'БЕЗЫМЯННЫЙ ПРОЕКТ'}</div>
      </Link>
      <Link to={`/`} className="invisible absolute top-0 right-0 m-2 group-hover:visible rounded-full h-8 flex items-center gap-2 group/ava">
        <div className=" invisible text-white group-hover/ava:visible font-bold">
        {'user'}
        </div>
        <img
          src={"noimg.png"}
          className="rounded-full h-full bg-white"
        />
        
      </Link>

      <img src={"/noimg.png"} className="aspect-video rounded-md object-cover" />
      
          {/* <div className={`absolute top-1 left-1 px-4 rounded  ${"bg-lime-500"} text-white font-bold`}>
        OK
          </div> */}
        
      
    </div>

     );
}
 
export default Ssd;