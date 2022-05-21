import {createSelector, createSlice} from '@reduxjs/toolkit';

const initialState = {
  vins: [],
  name: 'toto',
  vendeurs: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateVins: (state, action) => {
      state.vins = action.payload;
    },
    updateVendeurs: (state, action) => {
      state.vendeurs = action.paylad;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const {updateVins, updateVendeurs, setName} = userSlice.actions;
export const selectSelf = state => state[userSlice.name];
export const selectVins = createSelector(selectSelf, state => state.vins);
export const selectName = createSelector(selectSelf, state => state.name);

export default userSlice.reducer;
