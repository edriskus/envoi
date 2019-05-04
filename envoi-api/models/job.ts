import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  title: { type: String, required: true },
  owner: { type: String, required: true },
});

export default mongoose.model('Job', jobSchema);