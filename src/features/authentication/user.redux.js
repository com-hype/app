import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {sendFinishRegistration} from '../welcome/hobbies/hobbies.services';
import {sendLogin, fetchUser} from './authentication.services';

const initialState = {
  header: {status: 'nothing', connected: false},
  token: null,
  data: null,
};

export const login = createAsyncThunk('user/login', async payload => {
  const response = await sendLogin(payload);
  return response;
});

export const checkToken = createAsyncThunk('user/me', async token => {
  const response = await fetchUser(token);
  return response;
});

export const finishRegistration = createAsyncThunk(
  'user/register/finish',
  async (payload, {getState}) => {
    const {token} = getState().user;
    const response = await sendFinishRegistration(payload, token);
    return response;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateHeader: (state, action) => {
      state.header = action.payload;
    },
    updateUser: (state, action) => {
      state.data = action.paylad;
    },
    setUser: (state, action) => {
      state.header = action.payload.header;
      state.data = action.payload.user;
    },
    deleteUser: (state, action) => {
      state.header = {status: 'done', connected: false};
      state.data = null;
    },
  },

  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      console.log('login ->', action);
      if (action.payload.status === 'done') {
        state.header.status = 'done';
        state.header.connected = true;
        state.token = action.payload.response.token;
        state.data = action.payload.response.user;
      }
    });

    builder.addCase(checkToken.fulfilled, (state, action) => {
      if (action.payload.status === 'done') {
        state.header.status = 'done';
        state.header.connected = true;
        state.data = action.payload.response.user;
      } else {
        state.header.status = 'done';
        state.header.connected = false;
        state.data = null;
        state.token = null;
      }
    });
    builder.addCase(checkToken.rejected, (state, action) => {
      state.header.status = 'done';
      state.header.connected = false;
      state.data = null;
      state.token = null;
    });

    builder.addCase(finishRegistration.fulfilled, (state, action) => {
      state.header.status = 'done';
      console.log(action.payload.response);
      state.data = action.payload.response.user;
    });

    builder.addCase(finishRegistration.rejected, (state, action) => {
      state.header.status = 'done';
    });
  },
});

export const {updateHeader, updateUser, setUser, deleteUser} =
  userSlice.actions;
export const selectUser = state => state.user.data;
export const selectToken = state => state.user.token;
export const selectHeader = state => state.user.header;
export const selectAll = state => state.user;

export default userSlice.reducer;
