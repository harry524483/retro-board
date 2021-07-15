import { createSlice, nanoid } from '@reduxjs/toolkit';
import { BOARD_CREATED } from '../../common/actions';

const initialState = {
  isModalOpen: false,
  boards: [
    {
      id: nanoid(),
      name: 'PAP retro',
      date: '01 Jun 2021',
      columns: [
        { name: 'Sad', count: 30 },
        { name: 'Mad', count: 15 },
        { name: 'Glad', count: 5 },
        { name: 'Actions', count: 20 },
        { name: 'Safty check', count: 9 },
        { name: 'Health check', count: 18 }
      ]
    }
  ]
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    displayModal(state, { payload }) {
      state.isModalOpen = payload;
    }
  },
  extraReducers: {
    [BOARD_CREATED]: (state) => {
      state.isModalOpen = false;
    }
  }
});

export const { displayModal } = dashboardSlice.actions;

export default dashboardSlice.reducer;
