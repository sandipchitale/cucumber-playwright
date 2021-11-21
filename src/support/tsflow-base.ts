/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserContext, Page } from 'playwright';

export abstract class TSFlowBase {
  get page(): Page {
    return (this as any)['_worldObj']['page'];
  }

  get browserContext(): BrowserContext {
    return (this as any)['_worldObj']['context'];
  }
}
