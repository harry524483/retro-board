import { take } from 'redux-saga/effects';
import { TEST } from '../../../common/actions';

function* test(socket) {
  console.log('socket', socket);
  while (true) {
    console.log('hello');
    yield take(TEST);
  }
}

export default test;
