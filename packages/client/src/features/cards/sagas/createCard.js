import { select, take } from 'redux-saga/effects';
import { CREATE_CARD } from '../../../common/actions';
import { selectBoardId } from '../../board/boardSlice';

function* createCard(socket) {
  while (true) {
    const {
      payload: { columnId, cardId, value }
    } = yield take(CREATE_CARD);

    const boardId = yield select(selectBoardId);

    socket.emit(CREATE_CARD, boardId, { columnId, cardId, value });
  }
}

export default createCard;
