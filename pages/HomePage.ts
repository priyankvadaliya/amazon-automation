import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  async search(term: string) {
    await this.page.fill('#twotabsearchtextbox', term);
    await this.page.click('#nav-search-submit-button');
  }

  async clickSignIn() {
    await this.page.click('#nav-link-accountList');
  }
}