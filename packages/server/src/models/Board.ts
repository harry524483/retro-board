import mongoose, { Schema } from 'mongoose';

const transform = (doc: any, ret: any) => {
  ret.id = ret._id.toString();
  delete ret._id;
  delete ret.__v;
};

const CardSchema = new Schema({ value: String, votes: Number });

const ColumnSchema = new Schema({
  name: String,
  color: String,
  cards: [CardSchema]
});

const BoardSchema = new Schema(
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

const Board = mongoose.model('Board', BoardSchema);

export default Board;
