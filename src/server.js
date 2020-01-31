const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

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

app.listen(8080,()=>{
  console.log('Serving on 8080');
});