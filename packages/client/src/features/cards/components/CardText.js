import { useRef, useState } from 'react';
import { Icon, Popup } from 'semantic-ui-react';

const CardText = ({
  card,
  color,
  hideCount,
  remainingVotes,
  disableVoting,
  onVoteAdd,
  onVoteRemove,
  onDelete,
  onDisplayText
}) => {
  const [displayPopup, setDisplayPopup] = useState(false);
  const contextRef = useRef();

  return (
    <div
      className="card__text-box"
      style={{ backgroundColor: `${color}` }}
      onMouseLeave={() => setDisplayPopup(false)}
    >
      <div className="card__text">{card.value}</div>
      <div className="card__text-icons">
        <Popup
          className="card__tooltip"
          context={contextRef}
          inverted
          position="bottom center"
          size="mini"
          open={displayPopup}
          content={
            remainingVotes === 0
              ? `No votes available`
              : `${remainingVotes} votes left`
          }
        />
        {card.votes > 0 && (
          <Icon
            name="cancel"
            className="trash-icon"
            onClick={() => {
              onVoteRemove(card.id);
              setDisplayPopup(true);
            }}
          />
        )}
        {disableVoting === false && (
          <Icon
            name="thumbs up outline"
            disabled={remainingVotes <= 0}
            className="trash-icon"
            onClick={() => {
              onVoteAdd(card.id);
              setDisplayPopup(true);
            }}
          />
        )}
        <span ref={contextRef}>{hideCount === false && card.votes}</span>
        <Icon
          className="edit-icon"
          name="pencil"
          onClick={() => onDisplayText(false)}
        />
        <Icon
          name="trash"
          className="trash-icon"
          onClick={() => onDelete(card.id)}
        />
      </div>
    </div>
  );
};

export default CardText;
