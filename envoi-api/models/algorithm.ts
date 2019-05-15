import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const filePointer = new Schema({ 
  name: { type: String, required: true },
  size: { type: Number, required: true },
  content: { type: String, required: true },
});

const algorithmSchema = new Schema({
  title: { type: String, required: true },
  owner: { type: String, required: true },
  description: { type: String, required: true },
  inputs: { type: String, required: true },
  gpu: { type: Boolean },
  dispatcher: filePointer,
  runner: filePointer,
  reducer: filePointer,
});

export default mongoose.model('Algorithm', algorithmSchema);