import { select, take } from 'redux-saga/effects';
import { actionTypes } from '@retro-board/common';

import { selectBoardId } from '../../board/boardSlice';

function* createCard(socket) {
  while (true) {
    const {
      payload: { columnId, cardId, value }
    } = yield take(actionTypes.CREATE_CARD);

    const boardId = yield select(selectBoardId);

    socket.emit(actionTypes.CREATE_CARD, boardId, { columnId, cardId, value });
  }
}

export default createCard;
