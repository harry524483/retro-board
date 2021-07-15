import { select, take } from 'redux-saga/effects';
import { ADD_CARD } from '../../../common/actions';
import { selectBoardId } from '../../board/boardSlice';

function* addCard(socket) {
  while (true) {
    const { payload: columnId } = yield take(ADD_CARD);

    const boardId = yield select(selectBoardId);

    socket.emit(ADD_CARD, boardId, columnId);
  }
}

export default addCard;
