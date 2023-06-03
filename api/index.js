const express = require('express');
const app = express();
const { port } = require('./config');
const apiRouter = require('./routes/api');
const bodyParser = require('body-parser');
const cors = require('cors');

const corsOptions = {
    origin: "http://localhost:3001",
};
  
app.use(cors(corsOptions));

require('./db/mongoose');

app.use(bodyParser.json());

app.use('/api/', apiRouter);



app.listen(port, () => {
    console.log('Server is working...');
})