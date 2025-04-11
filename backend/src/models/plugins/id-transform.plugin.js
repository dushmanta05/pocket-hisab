const idTransformPlugin = (schema) => {
  schema.virtual('id').get(function () {
    return this._id.toString();
  });

  const transformOptions = {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      const { _id, ...restFields } = ret;
      return { id: ret.id, ...restFields };
    }
  };

  schema.set('toJSON', transformOptions);
  schema.set('toObject', transformOptions);
};

module.exports = idTransformPlugin;
