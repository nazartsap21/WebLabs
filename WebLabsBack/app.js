require('dotenv').config({path: `${process.cwd()}/.env`});
const express = require('express');
const reminderRouter = require('./routes/reminderRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.APP_PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


app.get('/', (req, res) => {
  res.status(200).json({
      status: 'success',
      message: 'Hello World'
  });
});

app.use('/api/v1/reminders', reminderRouter);


app.use('*', (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: 'Route not found'
    });
});


app.listen(PORT, () => {
    console.log('Server is running on port ', PORT);
});
