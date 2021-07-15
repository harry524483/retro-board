import { actionTypes } from '@retro-board/common';

export const createBoard = (payload) => ({
  type: actionTypes.CREATE_BOARD,
  payload
});
export const boardCreated = (payload) => ({
  type: actionTypes.BOARD_CREATED,
  payload
});
export const joinBoard = (id) => ({
  type: actionTypes.JOIN_BOARD,
  payload: id
});
export const addColumn = (name) => ({
  type: actionTypes.ADD_COLUMN,
  payload: name
});
export const columnAdded = (payload) => ({
  type: actionTypes.COLUMN_ADDED,
  payload
});
export const deleteColumn = (id) => ({
  type: actionTypes.DELETE_COLUMN,
  payload: id
});
export const columnDeleted = (id) => ({
  type: actionTypes.COLUMN_DELETED,
  payload: id
});
export const updateColumnName = (payload) => ({
  type: actionTypes.UPDATE_COLUMN_NAME,
  payload
});
export const columnNameUpdated = (payload) => ({
  type: actionTypes.COLUMN_NAME_UPDATED,
  payload
});
export const addCard = (columnId) => ({
  type: actionTypes.ADD_CARD,
  payload: columnId
});
export const cardAdded = (payload) => ({
  type: actionTypes.CARD_ADDED,
  payload
});
export const closeCard = (payload) => ({
  type: actionTypes.CLOSE_CARD,
  payload
});
export const cardClosed = (payload) => ({
  type: actionTypes.CARD_CLOSED,
  payload
});
export const createCard = (payload) => ({
  type: actionTypes.CREATE_CARD,
  payload
});
export const cardCreated = (payload) => ({
  type: actionTypes.CARD_CREATED,
  payload
});
export const deleteCard = (payload) => ({
  type: actionTypes.DELETE_CARD,
  payload
});
export const cardDeleted = (payload) => ({
  type: actionTypes.CARD_DELETED,
  payload
});
