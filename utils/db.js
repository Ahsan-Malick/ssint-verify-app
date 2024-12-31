import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ssint';

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable.');
}

// Extend the global object to include mongoose cache

  global.mongoose= { conn: null, promise: null };


// Initialize global.mongoose if it doesn't exist
global.mongoose = global.mongoose || { conn: null, promise: null };

async function connectDB() {
  if (global.mongoose.conn) {
    return global.mongoose.conn; // Reuse the existing connection
  }

  if (!global.mongoose.promise) {
    const promise = await mongoose.connect(MONGO_URI,{autoIndex: true})
//     .then((mongooseInstance) => {
//       console.log('Connected to MongoDB');
//       return mongooseInstance;
//     }
// );
global.mongoose = {
    conn: promise,
    promise
  }
  }

  global.mongoose.conn = await global.mongoose.promise; // Cache the connection
  return global.mongoose.conn;
}

export default connectDB;
