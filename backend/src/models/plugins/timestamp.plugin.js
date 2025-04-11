const dayjs = require('dayjs');

const timestampPlugin = (schema) => {
  schema.add({
    createdAt: { type: Number },
    updatedAt: { type: Number },
  });

  schema.set('timestamps', {
    currentTime: () => dayjs().valueOf(),
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  });
};

module.exports = timestampPlugin;
