import { LaunchOptions } from 'playwright';
export const browserOptions: LaunchOptions = {
  headless: false,
  slowMo: 0,
  args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
};
