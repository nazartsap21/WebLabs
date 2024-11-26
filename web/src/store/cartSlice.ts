import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import CartServices from "../services/CartServices";
import {ICart} from "../interfaces/commonInterfaces";
import AuthServices from "../services/AuthServices";

export const getCart = createAsyncThunk(
    'cart/getCart',
    async () => {
        const token = localStorage.getItem('token');
        const response = await AuthServices.getUserId(token || '');
        const userId = response.data.userId;
        console.log(userId);
        return CartServices.getCart(userId);
    }
);

interface CartState {
    cart: ICart[] | null;
    status: string;
    error: string | null;
}

const initialStateCart: CartState = {
    cart: [],
    status: 'pending',
    error: null
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialStateCart,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCart.pending, (state, action) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.cart = action.payload.data.data
                state.status = 'fulfilled';
                state.error = null;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.cart = [];
                state.status = 'rejected';
                state.error = action.payload as string;
            })

    }
})

const cartReducer = cartSlice.reducer

// export const {} = cartsSlice.actions

export {initialStateCart};

export default cartReducer