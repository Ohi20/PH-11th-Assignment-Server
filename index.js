const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());

// user : dbUser
// password: Qy82OJYWAliyH3sG





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pukoz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log('connected');
  // perform actions on the collection object
  client.close();
});



// async function run(){
//     try{
//         await client.connect();
//         const userCollection = client.db("carexpress").collection("users");
       
//        app.post('/user', (req, res) =>{
//            const newUser= req.body;
//            console.log('adding new user', newUser);
//            res.send('user data recieved');
//        })
//     }
//     finally{
//         // await client.close();
//     }
// }

// run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('running my server');
});

app.listen(port, () => {
    console.log('server is running');
})