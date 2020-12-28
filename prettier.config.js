module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  overrides: [
    {
      files: ['.eslintrc.json', 'tsconfig.json'],
      options: { parser: 'json-stringify' },
    },
  ],
};
