const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8dkbmd5.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    console.log('connected')
    const notesCollections = client.db('jobTask').collection('notes');

    //getting a note
    app.get('/notes', async (req, res) => {
      const query = {};
      const cursor = notesCollections.find(query);
      const notes = await cursor.toArray();
      res.send(notes)
    })

    //posting a note
    app.post('/notes', async (req, res) => {
      const notes = req.body;
      const result = await notesCollections.insertOne(notes);
      res.send(result)
    })


    //Updating a note 

    app.put('/notes/:id', async (req, res) => {
      const id = req.params.id;
      const notes = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: notes 
      };
      const result = await notesCollections.updateOne(filter, updateDoc, options);
      res.send(result)
    })

    //Deleting a data
    app.delete('/notes/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await notesCollections.deleteOne(query);
      res.send(result);
    }) 

  }
  finally {

  }

}

run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Hello From todo app!')
})

app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`)
})