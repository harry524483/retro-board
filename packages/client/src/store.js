import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import dashboardReducer from './features/dashboard/dashboardSlice';
import boardReducer from './features/board/boardSlice';
import cardsReducer from './features/cards/cardsSlice';
import columnsReducer from './features/columns/columnsSlice';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    board: boardReducer,
    cards: cardsReducer,
    columns: columnsReducer
  },
  middleware
});

sagaMiddleware.run(rootSaga);

export default store;
