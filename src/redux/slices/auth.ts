import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser, Inputs, ROLE, RegisterForm } from "../../models/user";
import axios from "../../axios";

interface userResponse {
  user: IUser;
  token: string;
}

export const fetchUser = createAsyncThunk( //хз нужны ли дженерики
  "auth/fetchUser",
  async (params: Inputs) => {
    localStorage.removeItem('token');
    const {data} = await axios.post(
      "/api/auth/authenticate",
      params
    );
    console.log("User?", data);

    return data as userResponse;//data
    // {
    //   user: {
    //     firstname: "Илья",
    //     lastname: "Ермолин",
    //     email: "AnckerStudios",
    //     img: "https://placekitten.com/500/500",
    //     role: "MODER"
    //   },
    //   token: "dsadasdasdasdsada"
    // }; 
  }
);
export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params: RegisterForm) => {
    localStorage.removeItem('token');
    const {data} = await axios.post(
      "/api/auth/register",
      params
    );
    return  data as userResponse;
  }
);

interface CounterState {
  user: IUser | null;
  token: string;
  status: string;
  //   token: string | null
}

// Define the initial state using that type
const initialState: CounterState = {
  user: null,
  token: '',
  status: "loading",
  //   token: null
};
export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<CounterState>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      status: "load";
      //   state.token = action.payload.token;
    },
    setUserInf: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      //   state.token = action.payload.token;
    },
    setBalance: (state, action: PayloadAction<number>) => {
      console.log("im here");
      
      if(state.user){
        console.log("im here also");
        
        state.user.balance = action.payload;
      }
      //   state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.status = "loading";
      state.user = null;
      state.token = '';
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = "loaded";
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.status = "error";
      state.user = null;
      state.token = '';
    });
    builder.addCase(fetchRegister.pending, (state) => {
      state.status = "loading";
      state.user = null;
      state.token = '';
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.status = "loaded";
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(fetchRegister.rejected, (state) => {
      state.status = "error";
      state.user = null;
      state.token = '';
    });
  },
});

export const authReducer = authSlice.reducer;
export const selectIsAuth = (state: { auth: CounterState }) =>
  Boolean(state.auth.user);
export const getUser = (state: { auth: CounterState }) => state.auth.user;
export const getToken = (state: { auth: CounterState }) => state.auth.token;
export const { logout, setUser, setUserInf, setBalance } = authSlice.actions;
