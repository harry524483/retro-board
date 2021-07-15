import { createSlice } from '@reduxjs/toolkit';

import { addVote, removeVote } from '../cards/cardsSlice';
import reorder from './helpers/reorder';
import {
  BOARD_CREATED,
  CARD_DELETED,
  COLUMN_ADDED,
  COLUMN_DELETED
} from '../../common/actions';

const initialState = { timer: { minutes: null, seconds: null, isOver: true } };

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    reorderColumns(state, { payload }) {
      const { sourceIndex, destinationIndex } = payload;
      state.columns = reorder(state.columns, sourceIndex, destinationIndex);
    },
    startTimer(state, { payload }) {
      const { minutes, seconds } = payload;

      state.timer.minutes = Number(minutes);
      state.timer.seconds = Number(seconds);
      state.timer.isOver = false;
    },
    resetTimer(state) {
      state.timer.isOver = true;
      state.timer.minutes = null;
      state.timer.seconds = null;
    },
    incrementVote(state) {
      state.maxVotes = state.maxVotes + 1;
      state.remainingVotes = state.remainingVotes + 1;
    },
    decrementVote(state) {
      state.maxVotes = state.maxVotes - 1;
      state.remainingVotes = state.remainingVotes - 1;
    },
    changeOption(state, { payload: key }) {
      state[key] = { ...state[key], checked: !state[key].checked };
    }
  },
  extraReducers: {
    [BOARD_CREATED]: (state, { payload }) => {
      const { result } = payload;
      return {
        ...state,
        ...result,
        remainingVotes: result.maxVotes
      };
    },
    [COLUMN_DELETED]: (state, { payload: columnId }) => {
      state.columns = state.columns.filter((id) => id !== columnId);
    },
    [COLUMN_ADDED]: (state, { payload }) => {
      const { id } = payload;
      state.columns.push(id);
    },
    [addVote]: (state) => {
      state.remainingVotes = state.remainingVotes - 1;
    },
    [removeVote]: (state) => {
      state.remainingVotes = state.remainingVotes + 1;
    },
    [CARD_DELETED]: (state, { payload }) => {
      const { votes } = payload;

      state.remainingVotes = state.remainingVotes + votes;
    }
  }
});

export const {
  reorderColumns,
  startTimer,
  resetTimer,
  incrementVote,
  decrementVote,
  changeOption
} = boardSlice.actions;

export default boardSlice.reducer;

export const selectBoardId = (state) => state.board.id;
