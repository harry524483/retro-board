import { useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DraggableProvided } from 'react-beautiful-dnd';

import { selectCardById } from '../cardsSlice';
import CardInput from '../components/CardInput';
import CardText from '../components/CardText';
import { addVote, removeVote } from '../cardsSlice';
import { closeCard, createCard, deleteCard } from '../../../common/actions';
import { GlobalState } from '../../../common/types';

type Props = {
  id: string;
  color: string;
  columnId: string;
  remainingVotes: number;
  disableVoting: boolean | undefined;
  hideCount: boolean | undefined;
  provided: DraggableProvided;
};

const Card: FC<Props> = ({
  id,
  color,
  columnId,
  remainingVotes,
  disableVoting,
  hideCount,
  provided
}): JSX.Element => {
  const [displayText, setDisplayText] = useState(true);
  const card = useSelector((state: GlobalState) => selectCardById(state, id));
  const dispatch = useDispatch();

  const onClose = (columnId: string, cardId: string) =>
    dispatch(closeCard({ columnId, cardId }));
  const onSubmit = (cardId: string, value: string) =>
    dispatch(createCard({ columnId, cardId, value }));
  const onDelete = (columnId: string, cardId: string) =>
    dispatch(deleteCard({ columnId, cardId, votes: card?.votes ?? 0 }));
  const onVoteAdd = (cardId: string) => dispatch(addVote(cardId));
  const onVoteRemove = (cardId: string) => dispatch(removeVote(cardId));

  return (
    <div
      className="card"
      {...provided.draggableProps}
      ref={provided.innerRef}
      {...provided.dragHandleProps}
    >
      {card &&
        (card.value && displayText ? (
          <CardText
            card={card}
            color={color}
            hideCount={hideCount}
            remainingVotes={remainingVotes}
            disableVoting={disableVoting}
            onVoteAdd={onVoteAdd}
            onVoteRemove={onVoteRemove}
            onDelete={(cardId: string) => onDelete(columnId, cardId)}
            onDisplayText={setDisplayText}
          />
        ) : (
          <CardInput
            card={card}
            color={color}
            onClose={(cardId: string) => onClose(columnId, cardId)}
            onDisplayText={setDisplayText}
            onSubmit={onSubmit}
          />
        ))}
    </div>
  );
};

export default Card;
