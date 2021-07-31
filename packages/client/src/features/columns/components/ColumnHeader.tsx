import { FC, useEffect, useRef, useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

import useOnClickOutside from '../../../common/hooks/useOnClickOutside';
import { NormalizedColumn } from '../../../common/types';

type Props = {
  column: NormalizedColumn;
  onDelete: Function;
  onNameUpdate: Function;
  dragHandleProps: DraggableProvidedDragHandleProps | null;
};

const ColumnHeader: FC<Props> = ({
  column,
  onDelete,
  onNameUpdate,
  dragHandleProps
}) => {
  const [displayInput, setDisplayInput] = useState(false);
  const [name, setName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const columnHeaderRef = useRef<HTMLDivElement>(null);
  useOnClickOutside<HTMLDivElement>(columnHeaderRef, () =>
    setDisplayInput(false)
  );

  useEffect(() => {
    if (displayInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [displayInput]);

  useEffect(() => {
    setName(column.name);
  }, [column.name]);

  const handleSubmit = () => {
    onNameUpdate(column.id, name);
    setDisplayInput(false);
  };

  const renderedNameInput = (
    <div className="column-header__input-box">
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        ref={inputRef}
        onKeyPress={(event) => event.key === 'Enter' && handleSubmit()}
      />
      <div className="column-header__input-icons">
        <Icon
          name="window close outline"
          link
          className="close-icon"
          onClick={() => {
            setDisplayInput(false);
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

  const renderedIcons = (
    <span className="column-header__icons">
      <Icon
        name="pencil"
        className="edit-icon light-grey-color"
        size="small"
        onClick={() => setDisplayInput(true)}
      />
      <Icon
        name="move"
        className="move-icon light-grey-color"
        size="small"
        {...dragHandleProps}
      />
      <Icon
        name="trash"
        className="trash-icon light-grey-color"
        size="small"
        onClick={() => onDelete(column.id)}
      />
    </span>
  );

  return (
    <div className="column-header" ref={columnHeaderRef}>
      {displayInput ? renderedNameInput : <span>{column.name}</span>}
      {!displayInput && renderedIcons}
    </div>
  );
};

export default ColumnHeader;
