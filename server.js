import express from 'express';
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import Promise from 'bluebird'
import dotenv from 'dotenv'
import auth from './server/routes/auth';
import userLog from './server/routes/userLog';


const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_DB_URL, {useMongoClient: true}, (err) => {
  if (err) {
    console.log("Mongo error: ", err);
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/user', auth);
app.use('/cvv', userLog);
app.use(express.static(__dirname + '/dist'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'))
});

const listener = app.listen(PORT, () => console.log("listening application: ", listener.address().port));


