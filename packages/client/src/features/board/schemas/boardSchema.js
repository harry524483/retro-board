import { schema } from 'normalizr';

const card = new schema.Entity('cards', {});
const column = new schema.Entity('columns', { cards: [card] });
const boardSchema = { columns: [column] };

export default boardSchema;
