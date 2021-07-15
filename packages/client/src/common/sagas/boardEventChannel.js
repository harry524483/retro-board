import { eventChannel } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';
import { normalize } from 'normalizr';

import boardSchema from '../../features/board/schemas/boardSchema';
import {
  BOARD_CREATED,
  boardCreated,
  COLUMN_ADDED,
  columnAdded,
  COLUMN_DELETED,
  columnDeleted,
  COLUMN_NAME_UPDATED,
  columnNameUpdated,
  CARD_ADDED,
  cardAdded,
  CARD_CLOSED,
  cardClosed,
  CARD_CREATED,
  cardCreated,
  CARD_DELETED,
  cardDeleted
} from '../actions';

const createBoardChannel = (socket) => {
  return eventChannel((emitter) => {
    socket.once(BOARD_CREATED, (payload) => {
      emitter({ type: BOARD_CREATED, payload });
    });

    socket.on(COLUMN_ADDED, (payload) => {
      emitter({ type: COLUMN_ADDED, payload });
    });

    socket.on(COLUMN_DELETED, (payload) => {
      emitter({ type: COLUMN_DELETED, payload });
    });

    socket.on(COLUMN_NAME_UPDATED, (payload) => {
      emitter({ type: COLUMN_NAME_UPDATED, payload });
    });

    socket.on(CARD_ADDED, (payload) => {
      emitter({ type: CARD_ADDED, payload });
    });

    socket.on(CARD_CLOSED, (payload) => {
      emitter({ type: CARD_CLOSED, payload });
    });

    socket.on(CARD_CREATED, (payload) => {
      emitter({ type: CARD_CREATED, payload });
    });

    socket.on(CARD_DELETED, (payload) => {
      emitter({ type: CARD_DELETED, payload });
    });

    return () => socket.disconnect();
  });
};

function* boardEventChannel(socket) {
  const socketChannel = yield call(createBoardChannel, socket);

  while (true) {
    const action = yield take(socketChannel);

    if (action.type === BOARD_CREATED) {
      const normalizedBoard = normalize(action.payload, boardSchema);
      yield put(boardCreated(normalizedBoard));
    }

    if (action.type === COLUMN_ADDED) {
      yield put(columnAdded(action.payload));
    }

    if (action.type === COLUMN_DELETED) {
      yield put(columnDeleted(action.payload));
    }

    if (action.type === COLUMN_NAME_UPDATED) {
      yield put(columnNameUpdated(action.payload));
    }

    if (action.type === CARD_ADDED) {
      yield put(cardAdded(action.payload));
    }

    if (action.type === CARD_CLOSED) {
      yield put(cardClosed(action.payload));
    }

    if (action.type === CARD_CREATED) {
      yield put(cardCreated(action.payload));
    }

    if (action.type === CARD_DELETED) {
      yield put(cardDeleted(action.payload));
    }
  }
}

export default boardEventChannel;
