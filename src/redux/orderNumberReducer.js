import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  lastOrderNumber: 0
}

export const orderNumberSlice = createSlice({
  name: 'lastOrderNumber',
  initialState,
  reducers: {
    setOrderNumber: (state, { payload }) => {
      state.lastOrderNumber = payload;
    },
    addOrderNumber: (state) => {
      state.lastOrderNumber += 1;
    },
  },
})

export const { setOrderNumber, addOrderNumber } = orderNumberSlice.actions

export default orderNumberSlice.reducer
