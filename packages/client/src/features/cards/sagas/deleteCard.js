import { select, take } from 'redux-saga/effects';
import { DELETE_CARD } from '../../../common/actions';
import { selectBoardId } from '../../board/boardSlice';

function* deleteCard(socket) {
  while (true) {
    const {
      payload: { columnId, cardId, votes }
    } = yield take(DELETE_CARD);

    const boardId = yield select(selectBoardId);

    socket.emit(DELETE_CARD, boardId, { columnId, cardId, votes });
  }
}

export default deleteCard;
