const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.xmfj9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try{
        await client.connect();

        const database = client.db("BusCriket");
        const allTriketServices = database.collection("allCriketServices");
        const specialOffer = database.collection("specialOffer");
        const drivers = database.collection("driver");


        app.get('/allTicket', async (req, res) => {
            const cursor = allTriketServices.find({});
            const allTicket = await cursor.toArray();
            res.send(allTicket);
        });
        app.get('/SpecialOffer', async (req, res) => {
            const cursor = specialOffer.find({});
            const Offer = await cursor.toArray();
            res.send(Offer);
        });
        app.get('/driver', async (req, res) => {
            const cursor = drivers.find({});
            const driver = await cursor.toArray();
            res.send(driver);
        });
        
        app.get('/allTicket/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const allTicket = await allTriketServices.findOne(query);
            res.json(allTicket);
        })
        app.get('/SpecialOffer/:offerId', async (req, res) => {
            const id = req.params.offerId;
            const query = { _id: ObjectId(id)};
            const Offers = await specialOffer.findOne(query);
            res.json(Offers);
        })

        app.post('/allTicket', async (req, res) => {
            const addTickets = req.body;
            const result = await allTriketServices.insertOne(addTickets);
            res.json(result)
        });

    }
    finally{
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('runing bus criket service')
  })
  
  app.listen(port, () => {
    console.log("server is runing port",port)
  })
