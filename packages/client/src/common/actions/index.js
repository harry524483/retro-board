export const CREATE_BOARD = 'board/createBoard';
export const BOARD_CREATED = 'board/boardCreated';
export const JOIN_BOARD = 'board/joinBoard';
export const ADD_COLUMN = 'columns/addColumn';
export const COLUMN_ADDED = 'columns/columnAdded';
export const DELETE_COLUMN = 'columns/deleteColumn';
export const COLUMN_DELETED = 'columns/columnDeleted';
export const UPDATE_COLUMN_NAME = 'columns/updateColumnName';
export const COLUMN_NAME_UPDATED = 'columns/columnNameUpdated';
export const ADD_CARD = 'columns/addCard';
export const CARD_ADDED = 'columns/cardAdded';
export const CLOSE_CARD = 'columns/closeCard';
export const CARD_CLOSED = 'columns/cardClosed';
export const CREATE_CARD = 'columns/createCard';
export const CARD_CREATED = 'columns/cardCreated';
export const DELETE_CARD = 'columns/deleteCard';
export const CARD_DELETED = 'columns/cardDeleted';

export const TEST = 'board/test';

export const createBoard = (payload) => ({ type: CREATE_BOARD, payload });
export const boardCreated = (payload) => ({ type: BOARD_CREATED, payload });
export const joinBoard = (id) => ({ type: JOIN_BOARD, payload: id });
export const addColumn = (name) => ({ type: ADD_COLUMN, payload: name });
export const columnAdded = (payload) => ({ type: COLUMN_ADDED, payload });
export const deleteColumn = (id) => ({ type: DELETE_COLUMN, payload: id });
export const columnDeleted = (id) => ({ type: COLUMN_DELETED, payload: id });
export const updateColumnName = (payload) => ({
  type: UPDATE_COLUMN_NAME,
  payload
});
export const columnNameUpdated = (payload) => ({
  type: COLUMN_NAME_UPDATED,
  payload
});
export const addCard = (columnId) => ({ type: ADD_CARD, payload: columnId });
export const cardAdded = (payload) => ({ type: CARD_ADDED, payload });
export const closeCard = (payload) => ({ type: CLOSE_CARD, payload });
export const cardClosed = (payload) => ({ type: CARD_CLOSED, payload });
export const createCard = (payload) => ({ type: CREATE_CARD, payload });
export const cardCreated = (payload) => ({ type: CARD_CREATED, payload });
export const deleteCard = (payload) => ({ type: DELETE_CARD, payload });
export const cardDeleted = (payload) => ({ type: CARD_DELETED, payload });

export const test = (id) => ({ type: TEST, payload: id });
