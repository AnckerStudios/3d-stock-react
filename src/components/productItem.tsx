import { useState } from "react";
import { IProduct } from "../models/product";
import { Link, Navigate } from "react-router-dom";

interface ProductProps {
  product: IProduct;
  statusView: boolean;
}

function ProductItem({ product, statusView }: ProductProps) {
  const [load, setLoad] = useState(false);
  async function fetchFullImg() {}

  function loadFullImg() {}

  return (
    <div
      // to={`/product/${product.id}`}
      className=" aspect-video rounded-md relative group cursor-pointer hover:scale-110 hover:z-10 hover:shadow-2xl transition"
      onMouseEnter={loadFullImg}
    >
      <Link
        to={statusView ? `/property/${product.id}` : `/product/${product.id}`}
        className="transition ease-in-out delay-150 duration-300 absolute w-full h-full bg-gradient-to-t from-indigo-500 to-transparent to-40% hidden flex-col justify-end rounded-md group-hover:flex"
      >
        <div className="p-2 text-3xl font-bold text-white">{product.name ?? 'БЕЗЫМЯННЫЙ ПРОЕКТ'}</div>
      </Link>
      <Link to={`/${product.user.email}`} className="invisible absolute top-0 right-0 m-2 group-hover:visible rounded-full h-8 flex items-center gap-2 group/ava">
        <div className=" invisible text-white group-hover/ava:visible font-bold">
        {product.user.email}
        </div>
        <img
          src={product.user.img ?? "noimg.png"}
          className="rounded-full h-full bg-white"
          onClick={() => {
            return <Navigate to={"/anckerstudios"} />;
          }}
        />
        
      </Link>

      <img src={product.img ?? "/noimg.png"} className="aspect-video rounded-md object-cover" />

      {statusView && (
        <>
          <div className={`absolute top-1 left-1 px-4 rounded  ${
              product.status === "valid"
                ? "bg-green-600"
                : product.status === "invalid"
                ? "bg-red-600"
                : product.status === "draft"
                ? "bg-gray-400"
                : " bg-orange-400"
            } text-white font-bold`}>
            {product.status === "valid"
              ? "OK"
              : product.status === "invalid"
              ? "ОТКАЗ"
              : product.status === "draft"
              ? "ЧЕРНОВИК"
              : "ЖДЕМ"}
          </div>
          {/* <span className="absolute top-0 left-0 material-symbols-rounded font-bold text-white text-5xl">
            {product.status === "valid"
              ? "deployed_code"
              : product.status === "invalid"
              ? "deployed_code_alert"
              : "deployed_code_history"}
          </span>
          <span
            className={`absolute top-0 left-0 material-symbols-rounded ${
              product.status === "valid"
                ? "text-green-600"
                : product.status === "invalid"
                ? "text-red-600"
                : " text-orange-400"
            } text-5xl`}
          >
            {product.status === "valid"
              ? "deployed_code"
              : product.status === "invalid"
              ? "deployed_code_alert"
              : "deployed_code_history"}
          </span> */}
        </>
      )}
    </div>
  );
}

export default ProductItem;
