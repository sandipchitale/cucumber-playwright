/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { TSFlowBase } from '../support/tsflow-base';
import { binding, then } from 'cucumber-tsflow';

@binding()
export class GoogleSteps extends TSFlowBase {
  @then(/Google/)
  public async gotoGoogle(): Promise<void> {
    await this.page.goto('https://google.com');
    await this.page.waitForTimeout(10000);
  }
}
