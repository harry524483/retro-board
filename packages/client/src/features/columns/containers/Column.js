import { useDispatch, useSelector } from 'react-redux';

import { selectColumnById } from '../columnsSlice';
import ColumnHeader from '../components/ColumnHeader';
import AddCard from '../components/AddCard';
import CardList from '../../cards/containers/CardList';
import {
  deleteColumn,
  updateColumnName,
  addCard
} from '../../../common/actions';

const Column = ({ id, dragHandleProps }) => {
  const dispatch = useDispatch();
  const column = useSelector((state) => selectColumnById(state, id));

  const onCardAdd = (columnId) => dispatch(addCard(columnId));
  const onColumnDelete = (columnId) => dispatch(deleteColumn(columnId));
  const onColumnNameUpdate = (columnId, name) =>
    dispatch(updateColumnName({ columnId, name }));

  return (
    <div>
      <ColumnHeader
        column={column}
        onDelete={onColumnDelete}
        onNameUpdate={onColumnNameUpdate}
        dragHandleProps={dragHandleProps}
      />
      <AddCard column={column} onCardAdd={onCardAdd} />
      <CardList column={column} />
    </div>
  );
};

export default Column;
