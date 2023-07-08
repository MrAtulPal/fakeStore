import productReducer from "./ProductSlice";
import cartReducer from './cartSlice'
const {configureStore} = require("@reduxjs/toolkit");

const store =configureStore({   
    reducer:{
        cart:cartReducer,
        product : productReducer
    }

})

export default store;