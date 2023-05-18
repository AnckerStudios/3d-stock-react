import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser, Inputs, RegisterForm } from "../../models/user";
import axios from "../../axios";

interface userResponse {
  data: IUser;
}

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (params: Inputs) => {
    const { data } = await axios.post<Inputs, userResponse>(
      "/api/auth/authenticate",
      params
    );
    console.log("User?", data);

    return data;
  }
);
export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params: RegisterForm) => {
    const { data } = await axios.post<RegisterForm, userResponse>(
      "/api/auth/register",
      params
    );
    return data;
  }
);

interface CounterState {
  user: IUser | null;
  status: string;
  //   token: string | null
}

// Define the initial state using that type
const initialState: CounterState = {
  user: null,
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
      status: "load";
      //   state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.status = "loading";
      state.user = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = "loaded";
      state.user = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.status = "error";
      state.user = null;
    });
    builder.addCase(fetchRegister.pending, (state) => {
      state.status = "loading";
      state.user = null;
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.status = "loaded";
      state.user = action.payload;
    });
    builder.addCase(fetchRegister.rejected, (state) => {
      state.status = "error";
      state.user = null;
    });
  },
});

export const authReducer = authSlice.reducer;
export const selectIsAuth = (state: { auth: CounterState }) =>
  Boolean(state.auth.user);
export const { logout, setUser } = authSlice.actions;
