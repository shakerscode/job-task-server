const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8dkbmd5.mongodb.net/?retryWrites=true&w=majority`;

console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

 async function run() {
    try{
        await client.connect();
        console.log('connected')
        const productsCollections = client.db('jobTask').collection('products');

        app.get('/products', async (req, res) =>{
            const query = {};
            const cursor = productsCollections.find(query);
            const products = await cursor.toArray();
            res.send(products)
        })

    }
    finally{

    }

}

run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})