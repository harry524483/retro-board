import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { actionTypes, Column, CardPayload, Options } from '@retro-board/common';

import { addVote, removeVote } from '../cards/cardsSlice';
import reorder from './helpers/reorder';
import { BoardSlice, TimerValues } from './types';
import { GlobalState, NormalizedBoard } from '../../common/types';
import { ColumnPayload } from '../columns/types';

const initialState: BoardSlice = {
  timer: { minutes: 0, seconds: 0, isOver: true },
  maxVotes: 0,
  remainingVotes: 0
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    reorderColumns(
      state,
      action: PayloadAction<
        Pick<ColumnPayload, 'sourceIndex' | 'destinationIndex'>
      >
    ) {
      const { sourceIndex, destinationIndex } = action.payload;
      state.columns = reorder(state.columns!, sourceIndex, destinationIndex);
    },
    startTimer(
      state,
      { payload }: PayloadAction<Pick<TimerValues, 'minutes' | 'seconds'>>
    ) {
      const { minutes, seconds } = payload;

      state.timer.minutes = Number(minutes);
      state.timer.seconds = Number(seconds);
      state.timer.isOver = false;
    },
    resetTimer(state) {
      state.timer.isOver = true;
      state.timer.minutes = 0;
      state.timer.seconds = 0;
    },
    incrementVote(state) {
      state.maxVotes = state.maxVotes + 1;
      state.remainingVotes = state.remainingVotes + 1;
    },
    decrementVote(state) {
      state.maxVotes = state.maxVotes - 1;
      state.remainingVotes = state.remainingVotes - 1;
    },
    changeOption(
      state,
      {
        payload: key
      }: PayloadAction<
        keyof Pick<BoardSlice, 'hideCards' | 'disableVoting' | 'hideCount'>
      >
    ) {
      state[key] = { ...state[key], checked: !state[key]!.checked } as Options;
    }
  },
  extraReducers: {
    [actionTypes.BOARD_CREATED]: (
      state,
      { payload }: PayloadAction<NormalizedBoard>
    ) => {
      const { result } = payload;
      return {
        ...state,
        ...result,
        remainingVotes: result.maxVotes
      };
    },
    [actionTypes.COLUMN_DELETED]: (
      state,
      { payload: columnId }: PayloadAction<string>
    ) => {
      state.columns = state.columns!.filter((id) => id !== columnId);
    },
    [actionTypes.COLUMN_ADDED]: (
      state,
      { payload: { id } }: PayloadAction<Column>
    ) => {
      state.columns!.push(id);
    },
    [addVote.type]: (state) => {
      state.remainingVotes = state.remainingVotes - 1;
    },
    [removeVote.type]: (state) => {
      state.remainingVotes = state.remainingVotes + 1;
    },
    [actionTypes.CARD_DELETED]: (
      state,
      { payload: { votes } }: PayloadAction<Omit<CardPayload, 'value'>>
    ) => {
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

export const selectBoardId = (state: GlobalState) => state.board.id;
