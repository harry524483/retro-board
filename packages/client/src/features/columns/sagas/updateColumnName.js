import { select, take } from 'redux-saga/effects';
import { actionTypes } from '@retro-board/common';

import { selectBoardId } from '../../board/boardSlice';

function* updateColumnName(socket) {
  while (true) {
    const {
      payload: { columnId, name }
    } = yield take(actionTypes.UPDATE_COLUMN_NAME);

    const boardId = yield select(selectBoardId);

    socket.emit(actionTypes.UPDATE_COLUMN_NAME, boardId, { columnId, name });
  }
}

export default updateColumnName;
