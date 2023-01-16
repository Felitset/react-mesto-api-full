const NotFoundError = require('../errors/404-not-found');

const pageNotFound = (req, res, next) => {
  next(new NotFoundError('Page not found'));
};

module.exports = {
  pageNotFound,
};
