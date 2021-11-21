import { ICustomWorld } from './custom-world';
import { BrowserFactory } from './playwright/browser-factory';
import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { ITestCaseHookParameter } from '@cucumber/cucumber/lib/support_code_library_builder/types';

setDefaultTimeout(process.env.PWDEBUG ? -1 : 60 * 1000);

BeforeAll(async function () {});

Before({ tags: '@ignore' }, async function () {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return 'skipped' as any;
});

Before({ tags: '@debug' }, async function (this: ICustomWorld) {
  this.debug = true;
});

Before(async function (this: ICustomWorld, { pickle }: ITestCaseHookParameter) {
  const browser = await BrowserFactory.browser(this);
  // customize the [browser context](https://playwright.dev/docs/next/api/class-browser#browsernewcontextoptions)
  this.context = await browser.newContext({
    acceptDownloads: true,
    recordVideo: process.env.PWVIDEO ? { dir: 'screenshots' } : undefined,
  });

  this.page = await this.context.newPage();
  this.page.on('console', async (msg) => {
    if (msg.type() === 'log') {
      await this.attach(msg.text());
    }
  });
  this.feature = pickle;
});

After(async function (this: ICustomWorld, { result }: ITestCaseHookParameter) {
  if (result) {
    await this.attach(`Status: ${result?.status}. Duration:${result.duration?.seconds}s`);

    if (result.status !== Status.PASSED) {
      const image = await this.page?.screenshot();
      image && (await this.attach(image, 'image/png'));
    }
  }
  await this.page?.close();
  await this.context?.close();
});

AfterAll(async function () {
  const browser = await BrowserFactory.cachedBrowser;
  if (browser) {
    browser.close();
  }
});
