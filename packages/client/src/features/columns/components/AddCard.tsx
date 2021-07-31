import { FC } from 'react';

import { NormalizedColumn } from '../../../common/types';

type Props = { column: NormalizedColumn; onCardAdd: Function };

const AddCard: FC<Props> = ({ column, onCardAdd }): JSX.Element => {
  return (
    <div className="add-card" onClick={() => onCardAdd(column.id)}>
      <div className="add-card__icon"></div>
    </div>
  );
};

export default AddCard;
