import { FC } from 'react';

type Props = { onModalOpen: () => void };

const AddBoard: FC<Props> = ({ onModalOpen }): JSX.Element => {
  return (
    <div className="add-board" onClick={onModalOpen}>
      <div className="add-board__icon"></div>
      <div className="add-board__label">Add board</div>
    </div>
  );
};

export default AddBoard;
