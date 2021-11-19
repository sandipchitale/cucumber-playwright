const common = `
  --require-module ts-node/register
  --require src/**/*.ts
  --format json:reports/firefox/report.json
  --format message:reports/firefox/report.ndjson
  --format html:reports/firefox/report.html
  --format summary
  --format progress-bar
  --format cucumber-console-formatter
  --format-options ${JSON.stringify({ snippetInterface: 'async-await' })}
  --publish-quiet
  `;

const getWorldParams = () => {
  const params = {
    browser: 'firefox',
    headless: false,
  };

  return `--world-parameters ${JSON.stringify({ params })}`;
};

module.exports = {
  default: `${common} ${getWorldParams()}`,
};
