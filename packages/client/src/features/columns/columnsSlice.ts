import {
  createSlice,
  createEntityAdapter,
  PayloadAction
} from '@reduxjs/toolkit';
import { actionTypes, Column, CardPayload } from '@retro-board/common';
import {
  GlobalState,
  NormalizedBoard,
  NormalizedColumn
} from '../../common/types';

import reorder from '../board/helpers/reorder';
import { ColumnPayload } from './types';

export const columnsAdapter = createEntityAdapter<NormalizedColumn>();

const defaultCardValues: Pick<NormalizedColumn, 'cards'> = { cards: [] };

const columnsSlice = createSlice({
  name: 'columns',
  initialState: columnsAdapter.getInitialState(),
  reducers: {
    reorderCards(
      state,
      action: PayloadAction<
        Pick<ColumnPayload, 'columnId' | 'sourceIndex' | 'destinationIndex'>
      >
    ) {
      const { columnId, sourceIndex, destinationIndex } = action.payload;
      const column = state.entities[columnId] ?? defaultCardValues;

      column.cards = reorder(column.cards, sourceIndex, destinationIndex);
    },
    moveCards(
      state,
      action: PayloadAction<
        Pick<
          ColumnPayload,
          'sourceId' | 'sourceIndex' | 'destinationId' | 'destinationIndex'
        >
      >
    ) {
      const { sourceId, sourceIndex, destinationId, destinationIndex } =
        action.payload;

      const sourceColumn = state.entities[sourceId] ?? defaultCardValues;
      const destinationColumn =
        state.entities[destinationId] ?? defaultCardValues;

      const [removedSourceCard] = sourceColumn.cards.splice(sourceIndex, 1);
      destinationColumn.cards.splice(destinationIndex, 0, removedSourceCard);
    }
  },
  extraReducers: {
    [actionTypes.BOARD_CREATED]: (
      state,
      { payload }: PayloadAction<NormalizedBoard>
    ) => {
      columnsAdapter.upsertMany(state, payload.entities.columns);
    },
    [actionTypes.COLUMN_ADDED]: (
      state,
      { payload: column }: PayloadAction<NormalizedColumn>
    ) => {
      columnsAdapter.addOne(state, column);
    },
    [actionTypes.COLUMN_DELETED]: (
      state,
      { payload: columnId }: PayloadAction<string>
    ) => {
      columnsAdapter.removeOne(state, columnId);
    },
    [actionTypes.COLUMN_NAME_UPDATED]: (
      state,
      { payload }: PayloadAction<Pick<Column, 'id' | 'name'>>
    ) => {
      const { id, name } = payload;

      columnsAdapter.updateOne(state, { id, changes: { name } });
    },
    [actionTypes.CARD_ADDED]: (
      state,
      { payload }: PayloadAction<Pick<CardPayload, 'columnId' | 'cardId'>>
    ) => {
      const { columnId, cardId } = payload;

      const column = state.entities[columnId] ?? defaultCardValues;
      column.cards.unshift(cardId);
    },
    [actionTypes.CARD_CLOSED]: (
      state,
      { payload }: PayloadAction<ColumnPayload>
    ) => {
      const { columnId, cardId } = payload;
      const column = state.entities[columnId] ?? defaultCardValues;

      column.cards = column.cards.filter((id) => id !== cardId);
    },
    [actionTypes.CARD_DELETED]: (
      state,
      { payload }: PayloadAction<Omit<CardPayload, 'value'>>
    ) => {
      const { columnId, cardId } = payload;
      const column = state.entities[columnId] ?? defaultCardValues;

      column.cards = column.cards.filter((id) => id !== cardId);
    }
  }
});

export const { reorderCards, moveCards } = columnsSlice.actions;

export default columnsSlice.reducer;

export const { selectById: selectColumnById, selectTotal: selectTotalColumns } =
  columnsAdapter.getSelectors((state: GlobalState) => state.columns);
