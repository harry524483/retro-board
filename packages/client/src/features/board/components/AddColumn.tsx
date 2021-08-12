import { FC, useEffect, useRef, useState, FormEvent, MouseEvent } from 'react';
import { Divider, Button, Input } from 'semantic-ui-react';

export type Props = { onAddColumn: Function };

const AddColumn: FC<Props> = ({ onAddColumn }): JSX.Element => {
  const [value, setValue] = useState('');
  const inputRef = useRef<Input>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (event: MouseEvent | FormEvent) => {
    event.preventDefault();

    if (value) {
      onAddColumn(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} data-testid="form">
      <h4>Add new column</h4>
      <Divider data-testid="divider" />
      <Input
        ref={inputRef}
        placeholder="Column name"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <Button
        color="facebook"
        fluid
        style={{ marginTop: '0.5rem' }}
        onClick={handleSubmit}
      >
        Add
      </Button>
    </form>
  );
};

export default AddColumn;
