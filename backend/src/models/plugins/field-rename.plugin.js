const fieldRenamePlugin = (schema) => {
  schema.set('versionKey', '_v');
};

module.exports = fieldRenamePlugin;
