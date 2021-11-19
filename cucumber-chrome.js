const common = `
  --require-module ts-node/register
  --require src/**/*.ts
  --format json:reports/chrome/report.json
  --format message:reports/chrome/report.ndjson
  --format html:reports/chrome/report.html
  --format summary
  --format progress-bar
  --format cucumber-console-formatter
  --format-options ${JSON.stringify({ snippetInterface: 'async-await' })}
  --publish-quiet
  `;

const getWorldParams = () => {
  const params = {
    browser: 'chrome',
    headless: false,
  };

  return `--world-parameters ${JSON.stringify({ params })}`;
};

module.exports = {
  default: `${common} ${getWorldParams()}`,
};
