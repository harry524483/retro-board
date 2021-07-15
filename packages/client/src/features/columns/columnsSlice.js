import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import {
  BOARD_CREATED,
  CARD_ADDED,
  CARD_CLOSED,
  CARD_DELETED,
  COLUMN_ADDED,
  COLUMN_DELETED,
  COLUMN_NAME_UPDATED
} from '../../common/actions';
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
    [BOARD_CREATED]: (state, { payload }) => {
      columnsAdapter.upsertMany(state, payload.entities.columns);
    },
    [COLUMN_ADDED]: (state, { payload: column }) => {
      columnsAdapter.addOne(state, column);
    },
    [COLUMN_DELETED]: (state, { payload: columnId }) => {
      columnsAdapter.removeOne(state, columnId);
    },
    [COLUMN_NAME_UPDATED]: (state, { payload }) => {
      const { columnId, name } = payload;

      columnsAdapter.updateOne(state, { id: columnId, changes: { name } });
    },
    [CARD_ADDED]: (state, { payload }) => {
      const { columnId, cardId } = payload;

      const column = state.entities[columnId];
      column.cards.unshift(cardId);
    },
    [CARD_CLOSED]: (state, { payload }) => {
      const { columnId, cardId } = payload;
      const column = state.entities[columnId];

      column.cards = column.cards.filter((id) => id !== cardId);
    },
    [CARD_DELETED]: (state, { payload }) => {
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
