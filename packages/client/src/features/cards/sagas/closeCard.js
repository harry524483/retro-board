import { select, take } from 'redux-saga/effects';
import { CLOSE_CARD } from '../../../common/actions';
import { selectBoardId } from '../../board/boardSlice';

function* closeCard(socket) {
  while (true) {
    const {
      payload: { columnId, cardId }
    } = yield take(CLOSE_CARD);

    const boardId = yield select(selectBoardId);

    socket.emit(CLOSE_CARD, boardId, { columnId, cardId });
  }
}

export default closeCard;
