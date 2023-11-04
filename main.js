const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const url = '<insert your MongoDB connection string here>';
const dbName = '<insert your database name here>';
const collectionName = '<insert your collection name here>';

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err);

  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  app.post('/resetpassword/:id', (req, res) => {
    const userId = req.params.id;
    const newPassword = req.body.password;

    // TODO: Implement password reset functionality here

    res.send('Password reset successful');
  });

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
