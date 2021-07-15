import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCardById } from '../cardsSlice';
import CardInput from '../components/CardInput';
import CardText from '../components/CardText';
import { addVote, removeVote } from '../cardsSlice';
import { closeCard, createCard, deleteCard } from '../../../common/actions';

const Card = ({
  id,
  color,
  columnId,
  remainingVotes,
  disableVoting,
  hideCount,
  provided
}) => {
  const [displayText, setDisplayText] = useState(true);
  const card = useSelector((state) => selectCardById(state, id));
  const dispatch = useDispatch();

  const onClose = (columnId, cardId) =>
    dispatch(closeCard({ columnId, cardId }));
  const onSubmit = (cardId, value) =>
    dispatch(createCard({ columnId, cardId, value }));
  const onDelete = (columnId, cardId) =>
    dispatch(deleteCard({ columnId, cardId, votes: card.votes }));
  const onVoteAdd = (cardId) => dispatch(addVote(cardId));
  const onVoteRemove = (cardId) => dispatch(removeVote(cardId));

  return (
    <div
      className="card"
      {...provided.draggableProps}
      ref={provided.innerRef}
      {...provided.dragHandleProps}
    >
      {card.value && displayText ? (
        <CardText
          card={card}
          color={color}
          hideCount={hideCount}
          remainingVotes={remainingVotes}
          disableVoting={disableVoting}
          onVoteAdd={onVoteAdd}
          onVoteRemove={onVoteRemove}
          onDelete={(cardId) => onDelete(columnId, cardId)}
          onDisplayText={setDisplayText}
        />
      ) : (
        <CardInput
          card={card}
          color={color}
          onClose={(cardId) => onClose(columnId, cardId)}
          onDisplayText={setDisplayText}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default Card;
