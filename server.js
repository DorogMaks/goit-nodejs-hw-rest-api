const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();
mongoose.set('strictQuery', false);

const { HOST_URI, PORT } = process.env;

(async () => {
  try {
    await mongoose.connect(HOST_URI);
    console.log('Database connection successful');

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error('Error while connecting to mongodb', error.message);
    process.exit(1);
  }
})();
