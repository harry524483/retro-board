import { eventChannel } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { actionTypes } from '@retro-board/common';

import boardSchema from '../../features/board/schemas/boardSchema';
import {
  boardCreated,
  columnAdded,
  columnDeleted,
  columnNameUpdated,
  cardAdded,
  cardClosed,
  cardCreated,
  cardDeleted
} from '../actions';

const createBoardChannel = (socket) => {
  return eventChannel((emitter) => {
    socket.once(actionTypes.BOARD_CREATED, (payload) => {
      emitter({ type: actionTypes.BOARD_CREATED, payload });
    });

    socket.on(actionTypes.COLUMN_ADDED, (payload) => {
      emitter({ type: actionTypes.COLUMN_ADDED, payload });
    });

    socket.on(actionTypes.COLUMN_DELETED, (payload) => {
      emitter({ type: actionTypes.COLUMN_DELETED, payload });
    });

    socket.on(actionTypes.COLUMN_NAME_UPDATED, (payload) => {
      emitter({ type: actionTypes.COLUMN_NAME_UPDATED, payload });
    });

    socket.on(actionTypes.CARD_ADDED, (payload) => {
      emitter({ type: actionTypes.CARD_ADDED, payload });
    });

    socket.on(actionTypes.CARD_CLOSED, (payload) => {
      emitter({ type: actionTypes.CARD_CLOSED, payload });
    });

    socket.on(actionTypes.CARD_CREATED, (payload) => {
      emitter({ type: actionTypes.CARD_CREATED, payload });
    });

    socket.on(actionTypes.CARD_DELETED, (payload) => {
      emitter({ type: actionTypes.CARD_DELETED, payload });
    });

    return () => socket.disconnect();
  });
};

function* boardEventChannel(socket) {
  const socketChannel = yield call(createBoardChannel, socket);

  while (true) {
    const action = yield take(socketChannel);

    if (action.type === actionTypes.BOARD_CREATED) {
      const normalizedBoard = normalize(action.payload, boardSchema);
      yield put(boardCreated(normalizedBoard));
    }

    if (action.type === actionTypes.COLUMN_ADDED) {
      yield put(columnAdded(action.payload));
    }

    if (action.type === actionTypes.COLUMN_DELETED) {
      yield put(columnDeleted(action.payload));
    }

    if (action.type === actionTypes.COLUMN_NAME_UPDATED) {
      yield put(columnNameUpdated(action.payload));
    }

    if (action.type === actionTypes.CARD_ADDED) {
      yield put(cardAdded(action.payload));
    }

    if (action.type === actionTypes.CARD_CLOSED) {
      yield put(cardClosed(action.payload));
    }

    if (action.type === actionTypes.CARD_CREATED) {
      yield put(cardCreated(action.payload));
    }

    if (action.type === actionTypes.CARD_DELETED) {
      yield put(cardDeleted(action.payload));
    }
  }
}

export default boardEventChannel;
