module.exports = function(res, req, next) {
  req.locals._sort = {
    enabled: false,
    type: 'default',
  };

  if (res.query.hasOwnProperty('_sort')) {
    // req.locals._sort.enabled = true;
    // req.locals._sort.type = res.query.type;
    // req.locals._sort.column = res.query.column;

    Object.assign(req.locals._sort, {
      enabled: true,
      type: res.query.type,
      column: res.query.column,
    });
  }

  next();
};
