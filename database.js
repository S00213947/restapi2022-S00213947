const mongoose = require('mongoose')

const connectionString = process.env.CONNECTIONSTRING || 'mongodb+srv://Richard:N*5t3Ba5u3hZNcw@cluster0.4jddjgt.mongodb.net/ngodb://127.0.0.1:27017/web2_2022'

mongoose
.connect(connectionString,
{"useNewUrlParser":true,
"useUnifiedTopology": true})
.catch (error => {
    console.log(`Database connection refused ${error}`);
    process.exit(2);
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log("DB connected")
});
