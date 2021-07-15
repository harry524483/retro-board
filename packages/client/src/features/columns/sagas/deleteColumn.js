import { select, take } from 'redux-saga/effects';

import { DELETE_COLUMN } from '../../../common/actions';
import { selectBoardId } from '../../board/boardSlice';

function* deleteColumn(socket) {
  while (true) {
    const { payload: columnId } = yield take(DELETE_COLUMN);

    const boardId = yield select(selectBoardId);

    socket.emit(DELETE_COLUMN, boardId, columnId);
  }
}

export default deleteColumn;
