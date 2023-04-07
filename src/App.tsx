import { useState } from 'react'
import ProductItem from './components/productItem';
import { IProduct } from './models/product';

function App() {
  const [count, setCount] = useState(0)
  let arr: IProduct[] = [];
  for (let i = 0; i < 16; i++) {
    arr.push({
      id: `${i}`,
      name: `Image ${i}`,
      img: `testMain/${i+1}.jpeg`
    })
  }
  return (
    <>
      <div className='w-full h-10 bg-indigo-400'></div>
      <div className=' max-w-7xl mx-auto '>
        <div className=' grid grid-cols-3 gap-1 mt-10'>
          {arr.map((item,index) => (
            <ProductItem key={index} product={item} />
          ))}
        </div>
      </div>
    </>
  )
}

export default App
