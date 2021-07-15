import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actionTypes } from '@retro-board/common';

const cardsAdapter = createEntityAdapter();

const cardsSlice = createSlice({
  name: 'cards',
  initialState: cardsAdapter.getInitialState(),
  reducers: {
    addVote(state, { payload: cardId }) {
      cardsAdapter.updateOne(state, {
        id: cardId,
        changes: { votes: state.entities[cardId].votes + 1 }
      });
    },
    removeVote(state, { payload: cardId }) {
      cardsAdapter.updateOne(state, {
        id: cardId,
        changes: { votes: state.entities[cardId].votes - 1 }
      });
    }
  },
  extraReducers: {
    [actionTypes.BOARD_CREATED]: (state, { payload }) => {
      if (payload.entities.cards) {
        cardsAdapter.upsertMany(state, payload.entities.cards);
      }
    },
    [actionTypes.CARD_ADDED]: (state, { payload }) => {
      const { cardId } = payload;
      cardsAdapter.addOne(state, { id: cardId, value: '', votes: 0 });
    },
    [actionTypes.CARD_CLOSED]: (state, { payload }) => {
      const { cardId } = payload;
      cardsAdapter.removeOne(state, cardId);
    },
    [actionTypes.CARD_CREATED]: (state, { payload }) => {
      const { cardId, value } = payload;

      cardsAdapter.updateOne(state, { id: cardId, changes: { value } });
    },
    [actionTypes.CARD_DELETED]: (state, { payload }) => {
      const { cardId } = payload;
      cardsAdapter.removeOne(state, cardId);
    }
  }
});

export const { addVote, removeVote } = cardsSlice.actions;

export default cardsSlice.reducer;

export const { selectById: selectCardById } = cardsAdapter.getSelectors(
  (state) => state.cards
);
