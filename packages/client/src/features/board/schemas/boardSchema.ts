import { Card, Column } from '@retro-board/common';
import { schema } from 'normalizr';

const card = new schema.Entity<Card>('cards', {});
const column = new schema.Entity<Column>('columns', { cards: [card] });
const boardSchema = { columns: [column] };

export default boardSchema;
