import { useState } from 'react'
import { IProduct } from '../models/product'
import { Link } from 'react-router-dom'

interface ProductProps {
  product: IProduct
}



function ProductItem({ product }: ProductProps) {
  const [load, setLoad] = useState(false)
  async function fetchFullImg() {
    
  }

  function loadFullImg(){
    
  }

  return (
    <Link to={`product/${product.id}`} className='w-full  rounded-md relative group cursor-pointer hover:scale-110 hover:z-10 hover:shadow-2xl transition' onMouseEnter={loadFullImg}>
      <div className='transition ease-in-out delay-150 duration-300 absolute w-full h-full bg-gradient-to-t from-indigo-500 to-transparent to-40% hidden flex-col justify-end rounded-md group-hover:flex'>
        <div className='p-2 text-3xl font-bold text-white'>{product.name}</div>
        <div className="absolute animate-spin top-0 m-2 h-5 w-5  rounded-full border-t-2 border-white " ></div>
      </div>
      <img src={product.img} className='rounded-md' />
      
    </Link>
  )
}

export default ProductItem
