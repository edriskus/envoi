import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const blockResultSchema = new Schema({
  userIds: { type: [String], required: true },
  data: Object,
});

const blockSchema = new Schema({
  jobId: { type: String, required: true },
  algorithmId: { type: String, required: true },
  running: { type: Boolean, required: true, default: false },
  validated: { type: Boolean, required: true, default: false },

  inputs: { type: Object, required: true },
  results: { type: [blockResultSchema], required: true },
});

export default mongoose.model('Block', blockSchema);