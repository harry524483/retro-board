import { take } from 'redux-saga/effects';
import { actionTypes } from '@retro-board/common';

function* createBoard(socket) {
  while (true) {
    const { payload: board } = yield take(actionTypes.CREATE_BOARD);

    socket.emit(actionTypes.CREATE_BOARD, board);
  }
}

export default createBoard;
