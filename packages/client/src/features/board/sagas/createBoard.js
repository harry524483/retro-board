import { take } from 'redux-saga/effects';

import { CREATE_BOARD } from '../../../common/actions';

function* createBoard(socket) {
  while (true) {
    const { payload: board } = yield take(CREATE_BOARD);

    socket.emit(CREATE_BOARD, board);
  }
}

export default createBoard;
