import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AuthServices from "../services/AuthServices";

// export const register = createAsyncThunk(
//     'auth/register',
//     async (data: { username: string, email: string, password: string }) => {
//         return await AuthServices.register(data.username, data.email, data.password);
//     }
// )

export const login = createAsyncThunk(
    'auth/login',
    async (data: { username: string, password: string }) => {
        return await AuthServices.login(data.username, data.password);
    }
)


export const checkToken = createAsyncThunk(
    'auth/checkToken',
    async (data: {token: string}) => {
        return await AuthServices.checkToken(data.token)
    }
)

interface AuthState {
    token: string;
    status: string;
    error: string | null;
    isAuth: boolean;
}

const initialStateAuth: AuthState = {
    token: localStorage.getItem('token') || '',
    status: 'pending',
    error: null,
    isAuth: false
}


export const authSlice = createSlice({
    name: 'auth',
    initialState: initialStateAuth,
    reducers: {
        logout: (state) => {
            state.token = '';
            state.isAuth = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // .addCase(register.pending, (state, action) => {
            //     state.status = 'pending';
            //     state.error = null;
            // })
            // .addCase(register.fulfilled, (state, action) => {
            //     state.status = 'fulfilled';
            //     state.error = null;
            //     state.isAuth = true;
            // })
            // .addCase(register.rejected, (state, action) => {
            //     state.token = "";
            //     state.status = 'rejected';
            //     state.error = action.payload as string;
            // })
            .addCase(login.pending, (state, action) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.token = action.payload.data.token;
                state.status = 'fulfilled';
                state.error = null;
                state.isAuth = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.token = '';
                state.status = 'rejected';
                state.error = action.payload as string;
            })
            .addCase(checkToken.pending, (state, action) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(checkToken.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                state.isAuth = action.payload.data.valid;
            })
            .addCase(checkToken.rejected, (state, action) => {
                state.token = '';
                state.status = 'rejected';
                state.error = action.payload as string;
            })

    }
})

const authReducer = authSlice.reducer

export const { logout } = authSlice.actions

export {initialStateAuth};

export default authReducer