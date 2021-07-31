import { FC, useEffect, useRef, useState } from 'react';
import { Divider, Button, Input } from 'semantic-ui-react';

type Props = { onAddColumn: Function };

const AddColumn: FC<Props> = ({ onAddColumn }): JSX.Element => {
  const [value, setValue] = useState('');
  const inputRef = useRef<Input>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = () => {
    if (value) {
      onAddColumn(value);
    }
  };

  return (
    <div>
      <h4>Add new column</h4>
      <Divider />
      <Input
        ref={inputRef}
        placeholder="Column name"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyPress={(event: KeyboardEvent) =>
          event.key === 'Enter' && handleSubmit()
        }
      />
      <Button
        color="facebook"
        fluid
        style={{ marginTop: '0.5rem' }}
        onClick={handleSubmit}
      >
        Add
      </Button>
    </div>
  );
};

export default AddColumn;
