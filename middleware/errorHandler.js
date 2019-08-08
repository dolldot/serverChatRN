const logger = require('morgan');

const errorHandler = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // logger.info('API error', { error: err });
  res.status(err.status || 500).json({ status: err.status, message: err.message });
};

module.exports = { errorHandler };
