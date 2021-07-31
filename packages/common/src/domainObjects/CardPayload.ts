import Card from './Card';

type CardPayload = { columnId: string; cardId: string } & Pick<
  Card,
  'value' | 'votes'
>;

export default CardPayload;
