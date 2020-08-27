const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'chatMessages';

module.exports.get = (req, res) => {
    MongoClient.connect(url, (err, client) => {
        console.log(res.status)
        if (err) {
            res.status(500);
            res.send('server error');
        } else {
            const db = client.db(dbName);
            db.collection('messages', (err, collection) => {
                if (err) {
                    res.status(500);
                    res.send('server error');
                } else {
                    collection.find({}).toArray((err, data) => {
                        res.status(200);
                        res.json(data);
                        res.end();
                        client.close();
                    })
                }
            })
        }
    })
}

module.exports.post = (req, response) => {
    console.log(req.body)
    MongoClient.connect(url, (err, client) =>{
        if(err){
            response.status(500);
            response.send('server error');
        } else{
            const db =client.db(dbName);
            db.collection('messages', (err, collection)=>{
                if (err) {
                    response.status(500);
                    response.send('server error');
                    console.log('warning: ', err);
                } else {
                    collection.insertOne(req.body, (err, res)=>{
                        if (err) {
                            response.status(500);
                            response.send('server error');
                        } else {
                        response.status(201);
                        response.json(res);
                        client.close();
                        }
                    })
                }
            })
        }
    })
}