import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCart, removeItem } from "../store/cartSlice";
import { STATUSES } from "../store/status";

export const Cart = () => {
  const { data: cartItem, Status } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    return()=>{
      dispatch(fetchCart());
    }
  }, []);

  const handleRemove = (itemID) => {
    dispatch(removeItem(itemID));
  };

  if (Status === STATUSES.LODING) {
    return <h1>Loading....</h1>;
  }
  if (Status === STATUSES.ERROR) {
    return <h1>Something Went Wrong</h1>;
  }

  return (
    <div id="container" className="pt-16 flex justify-between items-center flex-wrap px-14">
      {cartItem.length === 0 ? (
        <h1>Cart is empty</h1>
      ) :
        cartItem.map((product) => (
          <div id="product-box" className='hover:bg-slate-100 h-80 w-80 flex flex-col items-center justify-around p-5 mb-5 hover:shadow' key={product.id}>
            <img id="product-image" src={product.image} alt={product.title} className='w-2/5'/>
            <div className=" flex flex-col">
            <h1 className="mb-1">{product.title.slice(0,50)}</h1>
            <strong className="mb-1">{product.price} Rs</strong>
            <button className='border-2 border-inherit p-2 hover:bg-slate-200 text-sm w-32 mb-1' title="Add To Cart" onClick={() => handleRemove(product.id)}>Remove To Cart</button>

            </div>
          </div>
        ))
      }
    </div>
  );
};
