const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const app = express();
const port = 3333;

const SortMiddleware = require('./middlewares/sortMiddleware');

const route = require('./routes');
const db = require('./config/db');

db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

app.use(methodOverride('_method'));

// HTTP logger
// app.use(morgan('combined'));

app.use(SortMiddleware);

// Template engine
app.engine(
  '.hbs',
  handlebars.engine({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
      sortable: (field, sort) => {
              // const icons = {
              //   default: 'oi oi-elevator',
              //   asc: 'oi oi-sort-ascending',
              //   desc: 'oi oi-sort-descending',
              // };

              // const types = {
              //   default: 'desc',
              //   asc: 'desc',
              //   desc: 'asc',
              // };
              // const sortType = field === sort.column ? sort.type : 'default';

              // const icon = icons[sort.type];
              // const type = types[sort.type];
              // return `<a href="?_sort&column=${field}&type=${type}"><span class="${icon}"></span></a>`;
        const iconTypes = {
          default: 'oi oi-elevator',
          asc: 'oi oi-sort-ascending',
          desc: 'oi oi-sort-descending',
        };
        const sortTypes = {
          default: 'desc',
          asc: 'default',
          desc: 'asc',
        };
        const keyType = field === sort.column ? sort.type : 'default';
        const iconType = iconTypes[keyType];
        const sortType = sortTypes[keyType];

        if (sortType === 'default') {
          return `
              <a href="?_sort">
                  <span class="${iconType}"></span>
              </a>
              `;
        } else {
          // const href = Handlebars.escapeExpression(
          //   `?_sort&column=${field}&type=${sortType}`,
          // );

          const output = `
          <a href="?_sort&column=${field}&type=${sortType}"><span class="${iconType}"></span></a>
              `;
          return output;
        }
      },
    },
  }),
);
app.set('view engine', 'hbs');
app.set('views', './src/resources/views');
// app.set(express.static(path.join(__dirname, 'resources/views')));

// Routes init
route(app);
app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`),
);
