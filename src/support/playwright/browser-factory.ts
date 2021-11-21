import { ICustomWorld } from '../custom-world';
import {
  chromium,
  ChromiumBrowser,
  firefox,
  FirefoxBrowser,
  webkit,
  WebKitBrowser,
} from 'playwright';
import { join } from 'path';
type Browser = ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
export class BrowserFactory {
  static _browser: Browser;
  static async browser(world: ICustomWorld): Promise<Browser> {
    if (!BrowserFactory._browser) {
      const browserOptions = (
        await import(join(process.cwd(), world.parameters.params.browserOptions))
      ).browserOptions;
      switch (world.parameters.params.browser) {
        case 'firefox':
          BrowserFactory._browser = await firefox.launch(browserOptions);
          break;
        case 'webkit':
          BrowserFactory._browser = await webkit.launch(browserOptions);
          break;
        case 'msedge':
          BrowserFactory._browser = await chromium.launch(browserOptions);
          break;
        default:
          BrowserFactory._browser = await chromium.launch(browserOptions);
      }
    }
    return BrowserFactory._browser;
  }
  static get cachedBrowser(): Browser {
    return BrowserFactory._browser;
  }
}
