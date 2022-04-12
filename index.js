const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const colors = require("colors");
const dbConnect = require("./config/db");
const dotenv = require('dotenv')
// create express app
const app = express();

//load env vars
dotenv.config({ path: "./config/config.env" });

//Serving static folder 'uploads' for uploads.
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(cors());
app.options('*', cors());

//connect to database
dbConnect();

const user = require('./routes/user')
const book = require('./routes/book')
const exchangeRequest = require('./routes/exchangeRequest')

app.use('/api/user',user)
app.use('/api/book',book)
app.use('/api/exchangeRequest',exchangeRequest)


app.get("/", (req, res) => {
    res.json({"message": "Welcome to the ducray backend."});
  });

const PORT = process.env.PORT || 3010;

const server = app.listen(
  PORT,
  console.log(
    `Server running on port ${process.env.NODE_ENV} on port ${PORT} `.yellow
      .bold
  )
)