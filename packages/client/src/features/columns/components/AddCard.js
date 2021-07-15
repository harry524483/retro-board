const AddCard = ({ column, onCardAdd }) => {
  return (
    <div className="add-card" onClick={() => onCardAdd(column.id)}>
      <div className="add-card__icon"></div>
    </div>
  );
};

export default AddCard;
