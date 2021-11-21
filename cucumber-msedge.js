const common = `
  --require-module ts-node/register
  --require src/**/*.ts
  --format json:reports/msedge/report.json
  --format message:reports/msedge/report.ndjson
  --format html:reports/msedge/report.html
  --format summary
  --format progress-bar
  --format cucumber-console-formatter
  --format-options ${JSON.stringify({ snippetInterface: 'async-await' })}
  --publish-quiet
  `;

const getWorldParams = () => {
  const params = {
    browser: 'msedge',
    browserOptions: 'src/support/playwright/browser-options-msedge',
  };

  return `--world-parameters ${JSON.stringify({ params })}`;
};

module.exports = {
  default: `${common} ${getWorldParams()}`,
};
