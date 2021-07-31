import {
  createSlice,
  createEntityAdapter,
  PayloadAction
} from '@reduxjs/toolkit';
import { actionTypes, Card, CardPayload } from '@retro-board/common';

import { GlobalState, NormalizedBoard } from '../../common/types';

const cardsAdapter = createEntityAdapter<Card>();

const cardsSlice = createSlice({
  name: 'cards',
  initialState: cardsAdapter.getInitialState(),
  reducers: {
    addVote(state, { payload: cardId }: PayloadAction<string>) {
      const votes = state.entities[cardId]?.votes ?? 0;

      cardsAdapter.updateOne(state, {
        id: cardId,
        changes: { votes: votes + 1 }
      });
    },
    removeVote(state, { payload: cardId }: PayloadAction<string>) {
      const votes = state.entities[cardId]?.votes ?? 0;

      cardsAdapter.updateOne(state, {
        id: cardId,
        changes: { votes: votes - 1 }
      });
    }
  },
  extraReducers: {
    [actionTypes.BOARD_CREATED]: (
      state,
      { payload }: PayloadAction<NormalizedBoard>
    ) => {
      if (payload.entities.cards) {
        cardsAdapter.upsertMany(state, payload.entities.cards);
      }
    },
    [actionTypes.CARD_ADDED]: (
      state,
      { payload }: PayloadAction<Pick<CardPayload, 'columnId' | 'cardId'>>
    ) => {
      const { cardId } = payload;
      cardsAdapter.addOne(state, { id: cardId, value: '', votes: 0 });
    },
    [actionTypes.CARD_CLOSED]: (
      state,
      { payload }: PayloadAction<CardPayload>
    ) => {
      const { cardId } = payload;
      cardsAdapter.removeOne(state, cardId);
    },
    [actionTypes.CARD_CREATED]: (
      state,
      { payload }: PayloadAction<Omit<CardPayload, 'votes'>>
    ) => {
      const { cardId, value } = payload;

      cardsAdapter.updateOne(state, { id: cardId, changes: { value } });
    },
    [actionTypes.CARD_DELETED]: (
      state,
      { payload }: PayloadAction<Omit<CardPayload, 'value'>>
    ) => {
      const { cardId } = payload;
      cardsAdapter.removeOne(state, cardId);
    }
  }
});

export const { addVote, removeVote } = cardsSlice.actions;

export default cardsSlice.reducer;

export const { selectById: selectCardById } = cardsAdapter.getSelectors(
  (state: GlobalState) => state.cards
);
