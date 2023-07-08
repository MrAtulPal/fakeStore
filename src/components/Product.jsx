import {useEffect } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from "../store/ProductSlice";
import {STATUSES} from '../store/status'

import {useNavigate} from 'react-router-dom';

export const Product = () => {
  // const [products, setProducts] = useState([]);

const navigate = useNavigate();
  
const dispatch = useDispatch();
const {data:products,Status}= useSelector((state)=>state.product)

useEffect(() => {

  return()=>{
    dispatch(fetchProducts())
  }
},[]);



const handlenav=(itemID)=>{
  navigate(`/product?${itemID}`);
}

  if(Status === STATUSES.LODING){
    return <h1>Loding....</h1>
  }
  if(Status=== STATUSES.ERROR){
    return <h1>Something Went Wrong</h1>
  }

  return (
    <div id="container" className="pt-16 flex items-center justify-between flex-wrap  px-14" >
      {products.map((product) => (
        <div id="product-box" onClick={()=>handlenav(product.id)} key={product.id}  className='hover:bg-slate-100 h-80 w-80 flex flex-col items-center justify-around p-5 mb-5 hover:shadow'>
          <img id="product-image" src={product.image} alt={product.title} className='w-2/5'/>
          <div className=" ">
          <h1>{product.title.slice(0,50)}</h1>
          <strong>{product.price} Rs</strong>
          </div>
        </div>
      ))}
    </div>
  );
};
