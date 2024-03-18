module.exports = {
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
}