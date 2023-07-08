import {STATUSES} from './status'
const {createSlice,createAsyncThunk} = require("@reduxjs/toolkit")
// import { Dispatch } from 'react'

 export const productSlice = createSlice({
    name:"product",
    initialState:{
        data:[],
        status:STATUSES.IDLE,
        product:[],
        products:[]
    },
    reducers: {
      filterProducts: (state, action) => {
        const query = action.payload.toLowerCase();
        if(query){
            state.data = state.products.filter((product) =>
              product.title.toLowerCase().includes(query)
            );
        }if(query===''){
            state.data= state.products;
        }
    },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchProducts.pending,(state,action)=>{
            state.status=STATUSES.LODING
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.products=action.payload;
            state.data= state.products;
            state.status=STATUSES.IDLE
        })
        .addCase(fetchProducts.rejected,(state,action)=>{
            state.status=STATUSES.ERROR
        })
        .addCase(fetchProduct.fulfilled,(state,action)=>{
            state.product=action.payload
        })
    }
})

export const { filterProducts } = productSlice.actions;
export default productSlice.reducer

//thunk

export const fetchProducts=createAsyncThunk("products/fetch",async()=>{
    const res = await fetch("http://localhost:8888/products");
    const result = await res.json();
    return result
})

export const fetchProduct = createAsyncThunk('singleProduct/fetch',async(itemID)=>{
    const res = await fetch(`http://localhost:8888/products/${itemID}`)
    const result = await res.json()
    return result
})

// export function fetchProducts (){
//     return async function fetchProductsThunk (dispatch,getState){
//         dispatch(setStatus(STATUSES.LODING))
//         try{
//             const res = await fetch("http://localhost:8888/products");
//             const result = await res.json();
//             dispatch(setProducts(result))
//             dispatch(setStatus(STATUSES.IDLE))
//         }catch(err){
//             console.log(err)
//             dispatch(setStatus(STATUSES.ERROR))
//         }
//     }
// }