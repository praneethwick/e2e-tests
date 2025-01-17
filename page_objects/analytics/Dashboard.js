import Page from '../Page';
import { waitForElementToExist, waitForVisible } from '#support/wait';

class Dashboard extends Page {
  get headerDiv () { return browser.$('[data-test="dashboards-bar"]'); }
  get mainPageDiv () { return browser.$('.dashboard-scroll-container'); }
  get userIcon () { return browser.$('[class*="profile"]'); }
  get logoutLink () { return browser.$('[class*="profile"] [class*="contents"] li:last-child div'); }
  get filtersArea () { return browser.$('[data-test="dashboards-bar"]'); }
  
  get filters() {
    waitForVisible(this.filtersArea)
    return this.filtersArea.$$('a')
  }

  getFilterByIndex( index ) {
    return this.filtersArea.$('a:nth-of-type(' + index + ')')
  }

  open () {
    super.open('dhis-web-dashboard/index.html');
  }

  doLogout () {
    this.open();

    // open the user's menu
    waitForElementToExist(this.userIcon);
    this.userIcon.click();

    this.logoutLink.click();
  }
}

export default Dashboard;
export const dashboardPage = new Dashboard();
