import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const creditSchema = new Schema({
  jobId: { type: String, required: false },
  owner: { type: String, required: true },
  value: { type: Number, required: true }
});

export default mongoose.model('Credit', creditSchema);