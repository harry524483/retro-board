import { useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Icon } from 'semantic-ui-react';

const CardInput = ({ card, color, onClose, onDisplayText, onSubmit }) => {
  const [value, setValue] = useState(card.value);
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [card.value]);

  const handleSubmit = () => {
    onSubmit(card.id, value);
    onDisplayText(true);
  };

  return (
    <div
      className="card__input-box"
      style={{ border: `0.19rem solid ${color}` }}
    >
      <TextareaAutosize
        ref={inputRef}
        value={value}
        className="card__input"
        onChange={(event) => setValue(event.target.value)}
        onKeyPress={(event) => event.key === 'Enter' && handleSubmit()}
      />
      <div className="card__input-icons">
        <Icon
          name="window close outline"
          link
          className="close-icon"
          onClick={() => {
            card.value ? onDisplayText(true) : onClose(card.id);
          }}
        />
        <Icon
          className="check-icon"
          name="check square"
          link
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CardInput;
