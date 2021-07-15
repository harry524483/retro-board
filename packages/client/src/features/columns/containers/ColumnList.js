import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Column from './Column';
import { reorderColumns } from '../../board/boardSlice';
import { reorderCards, moveCards } from '../columnsSlice';

const ColumnList = () => {
  const columnIds = useSelector(({ board }) => board.columns);
  const dispatch = useDispatch();

  const onReorderColumns = (payload) => dispatch(reorderColumns(payload));
  const onReorderCards = (payload) => dispatch(reorderCards(payload));
  const onMoveCards = (payload) => dispatch(moveCards(payload));

  const handleDragEnd = (result) => {
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
          id: source.droppableId,
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
            {columnIds.map((id, index) => (
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
