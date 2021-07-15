import { select, take } from 'redux-saga/effects';

import { UPDATE_COLUMN_NAME } from '../../../common/actions';
import { selectBoardId } from '../../board/boardSlice';

function* updateColumnName(socket) {
  while (true) {
    const {
      payload: { columnId, name }
    } = yield take(UPDATE_COLUMN_NAME);

    const boardId = yield select(selectBoardId);

    socket.emit(UPDATE_COLUMN_NAME, boardId, { columnId, name });
  }
}

export default updateColumnName;
