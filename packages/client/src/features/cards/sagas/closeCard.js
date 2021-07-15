import { select, take } from 'redux-saga/effects';
import { actionTypes } from '@retro-board/common';

import { selectBoardId } from '../../board/boardSlice';

function* closeCard(socket) {
  while (true) {
    const {
      payload: { columnId, cardId }
    } = yield take(actionTypes.CLOSE_CARD);

    const boardId = yield select(selectBoardId);

    socket.emit(actionTypes.CLOSE_CARD, boardId, { columnId, cardId });
  }
}

export default closeCard;
