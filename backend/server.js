const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const productRoutes = require('./routes/productRoutes');

dotenv.config();
connectDB();

const app = express();

mongoose.connect(process.env.MONGO_URI)

app.get('/api', (req, res) => {
  res.send('api is running');
});

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`);
});
