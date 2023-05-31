import { useEffect, useState } from "react";
import { IProduct } from "../models/product";
import axios from "../axios";
import ProductItem from "../components/productItem";
import Ssd from "../components/ssd";

const WaitPage = () => {
    const [models, setModels] = useState<IProduct[]>([]);
    useEffect(() => {
      axios.get(`/api/model/check`).then((res) => {
        setModels((res.data as IProduct[]).sort((x,y)=>x.publicDate.localeCompare(y.publicDate)));
      });
    }, []);
    return ( 
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
            <p className=" text-3xl font-light mt-4">Модели ожидающие проверки:</p>
            <div className="grid grid-cols-3 gap-1">
            {models.map(x=>(
                <ProductItem product={x} statusView={false}/>
            ))}
                      {/* <Ssd/>
          <Ssd/>
          <Ssd/>
          <Ssd/>
          <Ssd/> */}
         
            </div>
            
        </div>
     );
}
 
export default WaitPage;