var express = require('express')
var app = express()
const dotenv = require('dotenv');
dotenv.config();
var bodyParser = require('body-parser')
var cors = require('cors')
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'PassOP';
client.connect();

const port = 3000;
app.use(bodyParser.json());
app.use(cors());

app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

app.post('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({ success: true, result: findResult });
})

app.delete('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({ success: true, result: findResult });
})

app.put('/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const filter = { id: id };
    const password = req.body;
    console.log(password);
    const updateDoc = {
        $set: { site: password.site, username: password.username, password: password.password } // Use $set to specify the fields to update
    };
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.updateOne(filter, updateDoc);
    res.send({ success: true, result: findResult });
})

app.listen(port, () => {
    console.log(`app running on port ${port}`)
})