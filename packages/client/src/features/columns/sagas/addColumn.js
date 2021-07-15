import { take, select } from 'redux-saga/effects';
import { actionTypes } from '@retro-board/common';

import { colors } from '../../../common/constants';
import { selectBoardId } from '../../board/boardSlice';
import { selectTotalColumns } from '../columnsSlice';

function* addColumn(socket) {
  while (true) {
    const { payload: name } = yield take(actionTypes.ADD_COLUMN);

    const boardId = yield select(selectBoardId);

    const totalColumns = yield select(selectTotalColumns);
    const color = colors[totalColumns];

    const column = { name, color, cards: [] };

    socket.emit(actionTypes.ADD_COLUMN, boardId, column);
  }
}

export default addColumn;
