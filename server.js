const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const morganSettings = process.config.NODE_ENV === 'devlopment' ? 'tiny' : 'common';
const { PORT } = require('./src/config');
const catRouter = require('./src/cats/cat-router')
const dogRouter = require('./src/dogs/dog-router')
const userRouter = require('./src/users/users-router')
const app = express();
app.use(cors());
app.use(morgan(morganSettings));


app.use('/api/cat', catRouter)
app.use('/api/dog', dogRouter)
app.use('/api/users', userRouter)

app.get('/', (req, res) => {
  res.send('Hello World');
});



// Catch-all 404
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Catch-all Error handler
// Add NODE_ENV check to prevent stacktrace leak
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});

app.listen(PORT,()=>{
  console.log(`Serving on ${PORT}`);
});