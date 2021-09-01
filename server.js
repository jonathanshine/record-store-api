// IMPORTS ------------------------------------------
import express from 'express';
const app = express();
const port = 5000;
import recordsRouter from './routes/recordsRouter.js';
import mongoose from 'mongoose';
import createError from 'http-errors';
// --------------------------------------------------


// MONGOOSE CONFIG ----------------------------------
mongoose.connect("mongodb://localhost:27017/record-store-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(() => console.log(`Connected successfully to DB`))
.catch((err) => console.log("We cannot connect to the DB -->", err))
// --------------------------------------------------



// Express Middleware
app.use( express.json() )



// ENDPOINTS
app.get('/', (req, res) => {
  res.send('Welcome to the Record Store API!')
})



// ROUTES
app.use("/records", recordsRouter);

app.use((req, res, next) => {
  const error = new createError(400, "Looks like you are lost...");
  next( error );
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// ERROR HANDLING
// whenever someone calls next(error), this error handler will trigger
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