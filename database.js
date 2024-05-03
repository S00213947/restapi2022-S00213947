const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

// This should dynamically select the right database based on the NODE_ENV or a specific env variable
const connectionString = process.env.CONNECTIONSTRING;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.catch(error => {
  console.error(`Database connection refused: ${error}`);
  process.exit(2);
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log("DB connected");
});