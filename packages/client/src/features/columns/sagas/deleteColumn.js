import { select, take } from 'redux-saga/effects';
import { actionTypes } from '@retro-board/common';

import { selectBoardId } from '../../board/boardSlice';

function* deleteColumn(socket) {
  while (true) {
    const { payload: columnId } = yield take(actionTypes.DELETE_COLUMN);

    const boardId = yield select(selectBoardId);

    socket.emit(actionTypes.DELETE_COLUMN, boardId, columnId);
  }
}

export default deleteColumn;
