import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.ATLAS_URI || "";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Runs once
const testConnection = async() => {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
     "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch(err) {
    console.error(err);
  }
}

testConnection();
const db = client.db("sticky_notes_storage");

export default db;