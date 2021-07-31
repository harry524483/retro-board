import { Schema, model, Document, Types } from 'mongoose';
import { Board, Column, Card } from '@retro-board/common';

interface ICard extends Omit<Card, 'id'>, Document {}

interface IColumn extends Omit<Column, 'id' | 'cards'>, Document {
  cards: Types.DocumentArray<ICard>;
}

interface IBoard extends Omit<Board, 'id' | 'columns'>, Document {
  columns: Types.DocumentArray<IColumn>;
}

const transform = (_: Document, ret: Document) => {
  ret.id = ret._id.toString();
  delete ret._id;
  delete ret.__v;
};

const CardSchema = new Schema<ICard>({ value: String, votes: Number });

const ColumnSchema = new Schema<IColumn>({
  name: String,
  color: String,
  cards: [CardSchema]
});

const BoardSchema = new Schema<IBoard>(
  {
    name: String,
    maxVotes: Number,
    hideCards: { label: String, checked: Boolean },
    disableVoting: { label: String, checked: Boolean },
    hideCount: { label: String, checked: Boolean },
    columns: [ColumnSchema]
  },
  { timestamps: true }
);

BoardSchema.set('toJSON', {
  transform
});

ColumnSchema.set('toJSON', {
  transform
});

CardSchema.set('toJSON', {
  transform
});

const BoardModel = model<IBoard>('Board', BoardSchema);

export default BoardModel;
