import { select, take } from 'redux-saga/effects';
import { actionTypes } from '@retro-board/common';

import { selectBoardId } from '../../board/boardSlice';

function* deleteCard(socket) {
  while (true) {
    const {
      payload: { columnId, cardId, votes }
    } = yield take(actionTypes.DELETE_CARD);

    const boardId = yield select(selectBoardId);

    socket.emit(actionTypes.DELETE_CARD, boardId, { columnId, cardId, votes });
  }
}

export default deleteCard;
