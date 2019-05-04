import * as mongoose from "mongoose";

/**
 * Sets mongoose ODM up
 */
export function setupMongoose() {
  mongoose.set('useFindAndModify', false);
  mongoose.connect('mongodb://localhost/envoi', {useNewUrlParser: true});
  const db = mongoose.connection;
  db.on('error', function(error: string) {
    throw `[ERR] MongoDB connection failed: ${error}`;
  });
  db.once('open', function() {
    console.log("[INFO] MongoDB connection obtained");
  });
}