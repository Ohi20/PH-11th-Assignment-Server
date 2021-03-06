const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
const ObjectId = require('mongodb').ObjectId;

// use middleware
app.use(cors());
app.use(express.json());

// user : dbUser
// password: Qy82OJYWAliyH3sG





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pukoz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

 async function run(){
     try{
         await client.connect();
         const serviceCollection = client.db("carInventory").collection("service");
         
         app.get('/service', async (req, res)=>{
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
         });

         app.delete('/service/:id', async(req, res)=>{
             const id= req.params.id;
             const query= {_id: ObjectId(id)};
             const result = await serviceCollection.deleteOne(query);
             res.send(result);
         })
       
       
     }
     finally{
//         // await client.close();
     }
 }

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('running my server');
});

app.get('/hero', (req, res)=>{
    res.send('Hero meets here ku')
})

app.listen(port, () => {
    console.log('server is running');
})