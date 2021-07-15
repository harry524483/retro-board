/* eslint-disable require-yield */
import { fork, call, actionChannel } from 'redux-saga/effects';
import io from 'socket.io-client';
import { actionTypes } from '@retro-board/common';

import createBoard from './features/board/sagas/createBoard';
import joinBoard from './features/board/sagas/joinBoard';
import boardEventChannel from './common/sagas/boardEventChannel';
import addColumn from './features/columns/sagas/addColumn';
import deleteColumn from './features/columns/sagas/deleteColumn';
import updateColumnName from './features/columns/sagas/updateColumnName';
import addCard from './features/columns/sagas/addCard';
import closeCard from './features/cards/sagas/closeCard';
import createCard from './features/cards/sagas/createCard';
import deleteCard from './features/cards/sagas/deleteCard';

const connect = () => {
  const socket = io('http://localhost:4000/');

  return new Promise((resolve) => {
    socket.on('connect', () => {
      resolve(socket);
      console.log('Socket connected');
    });
  });
};

function* rootSaga() {
  const boardActionChannel = yield actionChannel([actionTypes.JOIN_BOARD]);
  const socket = yield call(connect);

  yield fork(createBoard, socket);
  yield fork(joinBoard, socket, boardActionChannel);
  yield fork(addColumn, socket);
  yield fork(deleteColumn, socket);
  yield fork(updateColumnName, socket);
  yield fork(addCard, socket);
  yield fork(closeCard, socket);
  yield fork(createCard, socket);
  yield fork(deleteCard, socket);

  yield fork(boardEventChannel, socket);
}

export default rootSaga;
