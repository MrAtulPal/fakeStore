import { STATUSES } from "./status";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const addToCart = createAsyncThunk("addtocart/post", async (item) => {
  try {
    await fetch("http://localhost:8888/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    alert(`${item.title} successfully added to cart`);
  } catch (error) {
    console.error("Error adding item to cart:", error);
  }
});

export const fetchCart = createAsyncThunk("cart/fetch", async () => {
  const res = await fetch("http://localhost:8888/cart");
  const result = await res.json();
  return result;
});

export const removeItem = createAsyncThunk("remove/delete", async (itemID) => {
  await fetch(`http://localhost:8888/cart/${itemID}`, {
    method: "DELETE",
  });
  return itemID;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
    products:[]
  },
  // search filter

  reducers: {
    filterCart: (state, action) => {
      const query = action.payload.toLowerCase();
      if (query) {
        state.data = state.products.filter((product) =>
          product.title.toLowerCase().includes(query)
        );
      }
      if (query === "") {
        state.data = state.products;
      }
    },
  }
  // 
  ,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = STATUSES.LODING;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.products = action.payload;
        state.data = state.products;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        const itemID = action.payload;
        state.data = state.data.filter((item) => item.id !== itemID);
      });
  },
});

export default cartSlice.reducer;
export const { filterCart,cartLength } = cartSlice.actions;
