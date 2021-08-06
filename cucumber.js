const common = `
  --require-module ts-node/register
  --require src/**/*.ts
  --format json:reports/report.json
  --format message:reports/report.ndjson
  --format html:reports/report.html
  --format summary
  --format progress-bar
  --format @cucumber/pretty-formatter
  --format-options ${JSON.stringify({ snippetInterface: 'async-await' })}
  --publish-quiet
  `;

const getWorldParams = () => {
  const params = {
    headless: false,
  };

  return `--world-parameters ${JSON.stringify({ params })}`;
};

module.exports = {
  default: `${common} ${getWorldParams()}`,
};
