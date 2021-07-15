import { select, take } from 'redux-saga/effects';
import { actionTypes } from '@retro-board/common';

import { selectBoardId } from '../../board/boardSlice';

function* addCard(socket) {
  while (true) {
    const { payload: columnId } = yield take(actionTypes.ADD_CARD);

    const boardId = yield select(selectBoardId);

    socket.emit(actionTypes.ADD_CARD, boardId, columnId);
  }
}

export default addCard;
