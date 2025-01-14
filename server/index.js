// const express = require('express')
// const mongoose = require('mongoose')
// const morgan = require('morgan')
// const bodyParser = require('body-parser')
// const cors = require('cors')  
// const fs = require('fs')
// const { readdirSync } = require("fs");
// require('dotenv').config()


// const app = express()

// mongoose.connect("mongodb+srv://AbedAdmin:jhNdYfwf3rbruLaS@wiki.cnliskc.mongodb.net/?retryWrites=true&w=majority", (err) => {
//   if (err) {
//     console.error('Error connecting to MongoDB:', err);
//   } else {
//     console.log('Connected to MongoDB');
//   }
// });

// app.use(morgan("dev"))
// app.use(bodyParser.json({ limit: '2mb' }))
// app.use(cors())

// const router = require('./route/Category')
// readdirSync("./route").map((r) => app.use("/api", require("./route/" + r)));

// const port = process.env.PORT || 80

// app.listen()


const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const { readdirSync } = require("fs");
require('dotenv').config()
const path = require('path')
// const fn=require('fn')
const app = express()


app.use(morgan("dev"))
app.use(bodyParser.json({ limit: '2mb' }))
app.use(cors())

const router = require('./route/Category')
readdirSync("./route").map((r) => app.use("/api", require("./route/" + r)));


app.use(express.static(path.join("client")))
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

mongoose.connect('mongodb://localhost:27017/EcommerceApp', () => console.log('connected'))




// mongoose.connect(process.env.MONGO_URI, () => console.log('connected'))
const port = process.env.PORT || 80;

app.listen(port, (err) => {
  if (err) {
    console.error('Error starting the server:', err);
  } else {
    console.log(`Server is running on port ${port}`);
  }
});


