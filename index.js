require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

const port = process.env.PORT || process.env.PORT;


app.use(express.json()); //for raw json
app.use(express.urlencoded({extended: true}));

app.use('/api', userRoutes);
app.use('/api', studentRoutes);
app.use('/api', attendanceRoutes);


//app listen to port
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})