const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000

require('dotenv').config();


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.xmfj9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try{
        await client.connect();

        const database = client.db("BusCriket");
        const allCriketServices = database.collection("allCriketServices");
        const specialOffer = database.collection("specialOffer");


        app.get('/allTicket', async (req, res) => {
            const cursor = allCriketServices.find({});
            const allTicket = await cursor.toArray();
            res.send(allTicket);
        });
        app.get('/SpecialOffer', async (req, res) => {
            const cursor = specialOffer.find({});
            const Offer = await cursor.toArray();
            res.send(Offer);
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