const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const morganSettings = process.config.NODE_ENV === 'devlopment' ? 'tiny' : 'common';
const { PORT } = require('./src/config');
const catsRouter = require('./src/cats/cat-router')
const app = express();
app.use(cors({ origin: process.config.CLIENT_ORIGIN }));
app.use(morgan(morganSettings));

app.use('/api/cats', catsRouter)






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