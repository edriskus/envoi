import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const algorithmSchema = new Schema({
  title: { type: String, required: true },
  owner: { type: String, required: true },
});

export default mongoose.model('Algorithm', algorithmSchema);