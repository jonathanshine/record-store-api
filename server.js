// IMPORTS ------------------------------------------
import express from 'express';
const app = express();
const port = 5000;
import recordsRouter from './routes/recordsRouter.js';
import usersRouter from './routes/usersRouter.js';
import mongoose from 'mongoose';
import cors from 'cors';
import createError from 'http-errors';
import config from "./config/config.js"
// --------------------------------------------------



// MONGOOSE CONFIG ----------------------------------
mongoose.connect(config.mongooseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(() => console.log(`Connected successfully to DB`))
.catch((err) => console.log("We cannot connect to the DB -->", err));
// --------------------------------------------------



// MIDDLEWARE ---------------------------------------
app.use( express.json() );
app.use( cors() );


// INITIAL ENDPOINT ---------------------------------
app.get('/', (req, res) => {
  res.send(`<h1>Welcome to the Record Store API!</h1>
  <div><a href="/users">/users</a></div>
  <div><a href="/records">/records</a></div>
  `)
});



// ROUTES -------------------------------------------
app.use("/records", recordsRouter);

app.use("/users", usersRouter);

app.use((req, res, next) => {
  const error = new createError(400, "Looks like you are lost...");
  next( error );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});



// ERROR HANDLING -----------------------------------
app.use(
    function errorHandler (err, req, res, next) {
        res.status(err.status || 400).send({
            error: {
                message: err.message,
                status: err.status
            }
        });
    }
)