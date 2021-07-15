import { useEffect, useRef, useState } from 'react';
import { Divider, Button, Input } from 'semantic-ui-react';

const AddColumn = ({ onAddColumn }) => {
  const [value, setValue] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
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
        onKeyPress={(event) => event.key === 'Enter' && handleSubmit()}
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
