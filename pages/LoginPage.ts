import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  async login(mobile: any, password: any) {
    await this.page.locator("#nav-link-accountList-nav-line-1").click()
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.fill('[name="email"]', mobile);
    await this.page.click('#continue');
    await this.page.fill('[name="password"]', password);
    await this.page.click('#signInSubmit');
  }
}