import {createSelector, createSlice} from '@reduxjs/toolkit';

const initialState = {
  header: {status: 'nothing', connected: false},
  data: null,
};

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
});

export const {updateHeader, updateUser, setUser, deleteUser} =
  userSlice.actions;
export const selectUser = state => state.user.data;
export const selectHeader = state => state.user.header;
export const selectAll = state => state.user;

export default userSlice.reducer;
