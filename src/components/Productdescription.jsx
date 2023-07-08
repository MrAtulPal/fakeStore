import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchProduct } from '../store/ProductSlice'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { addToCart } from "../store/cartSlice";
import star from '../assests/star.svg'



export default function Productdescription() {
  const {product}=useSelector((state)=>state.product)
  const dispatch = useDispatch();
  const id= window.location.href.slice(30,33)
  
  useEffect(()=>{
    dispatch(fetchProduct(id))
  },[])

  const handleCart = (item)=>{
      dispatch(addToCart(item))
    
  }


  return (
        <div id="product-box" key={product.id} className="pt-16 px-14 flex pb-4">
          <img id="product-image" src={product.image} alt={product.title} className='flex-1 max-w-md'/>
          <div id="pro-des" className='flex-1 flex flex-col mt-20 items-start ml-20'>
          <h1 className='mb-4 text-xl font-normal'>{product.title}</h1>
          <p className='text-slate-400 mb-4'>{product.category}</p>
          <div className='mb-4'>
          <p>Description:</p>
          <p>{product.description}</p>
          </div>
          <p className='mb-4'>Price: {product.price}Rs</p>

          <p className='flex mb-4' >Rating:{product.rating }<img src={star} alt='star'/></p>
          <button className='border-2 border-inherit p-2 hover:bg-slate-200 text-sm ' title="Add To Cart" onClick={() => handleCart(product)}>Add To Cart</button>

          </div>
    </div>  )
}
