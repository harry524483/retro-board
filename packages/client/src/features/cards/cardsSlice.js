import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import {
  CARD_ADDED,
  CARD_CLOSED,
  CARD_CREATED,
  CARD_DELETED
} from '../../common/actions';

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
    [CARD_ADDED]: (state, { payload }) => {
      const { cardId } = payload;
      cardsAdapter.addOne(state, { id: cardId, value: '', votes: 0 });
    },
    [CARD_CLOSED]: (state, { payload }) => {
      const { cardId } = payload;
      cardsAdapter.removeOne(state, cardId);
    },
    [CARD_CREATED]: (state, { payload }) => {
      const { cardId, value } = payload;

      cardsAdapter.updateOne(state, { id: cardId, changes: { value } });
    },
    [CARD_DELETED]: (state, { payload }) => {
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
