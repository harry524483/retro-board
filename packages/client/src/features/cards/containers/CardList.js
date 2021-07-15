import { useSelector } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Card from './Card';

const CardList = ({ column }) => {
  const board = useSelector(({ board }) => board);

  return (
    <Droppable droppableId={column.id} type="card" isCombineEnabled>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {column.cards.map((id, index) => (
            <Draggable draggableId={id} index={index} key={id}>
              {(provided) => (
                <Card
                  id={id}
                  key={id}
                  columnId={column.id}
                  color={column.color}
                  remainingVotes={board.remainingVotes}
                  disableVoting={board.disableVoting.checked}
                  hideCount={board.hideCount.checked}
                  provided={provided}
                />
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default CardList;
