import { memo, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from 'react-beautiful-dnd';

import Column from './Column';
import { reorderColumns } from '../../board/boardSlice';
import { reorderCards, moveCards } from '../columnsSlice';
import { GlobalState } from '../../../common/types';
import { ColumnPayload } from '../types';

const ColumnList: FC = (): JSX.Element => {
  const columnIds = useSelector(({ board }: GlobalState) => board.columns);
  const dispatch = useDispatch();

  const onReorderColumns = (
    payload: Pick<ColumnPayload, 'sourceIndex' | 'destinationIndex'>
  ) => dispatch(reorderColumns(payload));
  const onReorderCards = (
    payload: Pick<
      ColumnPayload,
      'columnId' | 'sourceIndex' | 'destinationIndex'
    >
  ) => dispatch(reorderCards(payload));
  const onMoveCards = (
    payload: Pick<
      ColumnPayload,
      'sourceId' | 'sourceIndex' | 'destinationId' | 'destinationIndex'
    >
  ) => dispatch(moveCards(payload));

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      onReorderColumns({
        sourceIndex: source.index,
        destinationIndex: destination.index
      });
    }

    if (type === 'card') {
      if (source.droppableId === destination.droppableId) {
        onReorderCards({
          columnId: source.droppableId,
          sourceIndex: source.index,
          destinationIndex: destination.index
        });
      }

      if (source.droppableId !== destination.droppableId) {
        onMoveCards({
          sourceId: source.droppableId,
          sourceIndex: source.index,
          destinationId: destination.droppableId,
          destinationIndex: destination.index
        });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="board__container"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {columnIds &&
              columnIds.map((id, index) => (
                <Draggable draggableId={id} index={index} key={id}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      className="board__item"
                    >
                      <Column
                        id={id}
                        dragHandleProps={provided.dragHandleProps}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default memo(ColumnList);
