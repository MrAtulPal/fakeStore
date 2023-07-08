import { Outlet, Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import Cart from "../assests/cart.svg";
import  SearchBar  from "./SearchBar";
import { filterProducts } from '../store/ProductSlice.js';
import { filterCart ,fetchCart} from "../store/cartSlice.js";
import { useEffect } from "react";

export const Layout = () => {
  const { data: cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleSearch = (query) => {
    dispatch(filterProducts(query));
    dispatch(filterCart(query))
  };

  useEffect(() => {
    return()=>{
      dispatch(fetchCart());
    }
  }, [cart]);

  

  return (
    <>
      <nav className="flex fixed right-0 left-0 justify-between items-center bg-slate-400 px-14 h-14">
        <h1 className="text-xl font-medium">FAKE STORE👌</h1>

        <SearchBar handleSearch={handleSearch}/>

        <ul className="list-none  flex items-center ">
          <li className="pr-4">
            <Link className=" " to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="" to="/cart">
              <img
                src={Cart}
                alt="cart"
                width="20px"
                height="20px"
                className="relative"
              />
              <div className="absolute top-2 text-xs right-16 rounded-xl bg-white px-1">
                {cart.length}
              </div>
            </Link>
          </li>
        </ul>
      </nav>

      <Outlet className="mt-14" />

      <footer className="text-center bg-slate-400 p-1">
        &copy; Atul Works 2023
      </footer>
    </>
  );
};
