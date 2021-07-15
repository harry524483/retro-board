import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actionTypes } from '@retro-board/common';

import reorder from '../board/helpers/reorder';

export const columnsAdapter = createEntityAdapter();

const columnsSlice = createSlice({
  name: 'columns',
  initialState: columnsAdapter.getInitialState(),
  reducers: {
    reorderCards(state, { payload }) {
      const { id, sourceIndex, destinationIndex } = payload;
      const column = state.entities[id];

      column.cards = reorder(column.cards, sourceIndex, destinationIndex);
    },
    moveCards(state, { payload }) {
      const { sourceId, sourceIndex, destinationId, destinationIndex } =
        payload;

      const sourceColumn = state.entities[sourceId];
      const destinationColumn = state.entities[destinationId];

      const [removedSourceCard] = sourceColumn.cards.splice(sourceIndex, 1);
      destinationColumn.cards.splice(destinationIndex, 0, removedSourceCard);
    }
  },
  extraReducers: {
    [actionTypes.BOARD_CREATED]: (state, { payload }) => {
      columnsAdapter.upsertMany(state, payload.entities.columns);
    },
    [actionTypes.COLUMN_ADDED]: (state, { payload: column }) => {
      columnsAdapter.addOne(state, column);
    },
    [actionTypes.COLUMN_DELETED]: (state, { payload: columnId }) => {
      columnsAdapter.removeOne(state, columnId);
    },
    [actionTypes.COLUMN_NAME_UPDATED]: (state, { payload }) => {
      const { columnId, name } = payload;

      columnsAdapter.updateOne(state, { id: columnId, changes: { name } });
    },
    [actionTypes.CARD_ADDED]: (state, { payload }) => {
      const { columnId, cardId } = payload;

      const column = state.entities[columnId];
      column.cards.unshift(cardId);
    },
    [actionTypes.CARD_CLOSED]: (state, { payload }) => {
      const { columnId, cardId } = payload;
      const column = state.entities[columnId];

      column.cards = column.cards.filter((id) => id !== cardId);
    },
    [actionTypes.CARD_DELETED]: (state, { payload }) => {
      const { columnId, cardId } = payload;
      const column = state.entities[columnId];

      column.cards = column.cards.filter((id) => id !== cardId);
    }
  }
});

export const { reorderCards, moveCards } = columnsSlice.actions;

export default columnsSlice.reducer;

export const { selectById: selectColumnById, selectTotal: selectTotalColumns } =
  columnsAdapter.getSelectors((state) => state.columns);
