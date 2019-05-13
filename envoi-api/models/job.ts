import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const filePointer = new Schema({ 
  name: { type: String, required: true },
  size: { type: Number, required: true },
  content: { type: String, required: true },
});

const jobSchema = new Schema({
  title: { type: String, required: true },
  owner: { type: String, required: true },
  description: { type: String, required: true },
  algorithmId: { type: String, required: true },
  inputs: filePointer,
});

export default mongoose.model('Job', jobSchema);