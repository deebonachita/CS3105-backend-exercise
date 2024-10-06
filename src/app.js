const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const morgan = require('morgan');

const app = express();

app.use(bodyParser.json()); 
app.use(morgan('dev')); 
app.use('/user', userRoutes);

app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
