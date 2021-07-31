import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

import { selectColumnById } from '../columnsSlice';
import ColumnHeader from '../components/ColumnHeader';
import AddCard from '../components/AddCard';
import CardList from '../../cards/containers/CardList';
import {
  deleteColumn,
  updateColumnName,
  addCard
} from '../../../common/actions';
import { GlobalState } from '../../../common/types';

type Props = {
  id: string;
  dragHandleProps: DraggableProvidedDragHandleProps | null;
};

const Column: FC<Props> = ({ id, dragHandleProps }): JSX.Element => {
  const dispatch = useDispatch();
  const column = useSelector((state: GlobalState) =>
    selectColumnById(state, id)
  );

  const onCardAdd = (columnId: string) => dispatch(addCard(columnId));
  const onColumnDelete = (columnId: string) => dispatch(deleteColumn(columnId));
  const onColumnNameUpdate = (columnId: string, name: string) =>
    dispatch(updateColumnName({ id: columnId, name }));

  return (
    <div>
      {column && (
        <>
          <ColumnHeader
            column={column}
            onDelete={onColumnDelete}
            onNameUpdate={onColumnNameUpdate}
            dragHandleProps={dragHandleProps}
          />
          <AddCard column={column} onCardAdd={onCardAdd} />
          <CardList column={column} />
        </>
      )}
    </div>
  );
};

export default Column;
