import Card from './Card';

type Column = {
  id: string;
  name: string;
  color: string;
  cards: Array<Card>;
};

export default Column;
