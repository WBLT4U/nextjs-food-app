import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // e.g. "mongodb+srv://user:pass@cluster.mongodb.net/dbname"
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;
