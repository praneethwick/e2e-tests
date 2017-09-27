import Page from './Page';

class Dashboard extends Page {
    get logoutLink() { return browser.element('a[href$="/dhis-web-commons-security/logout.action"]') }
    get userIcon() { return browser.element('//*[@id="header"]/div/div[3]/div/div[1]') }

    open() {
        super.open('dhis-web-dashboard-integration/index.html');
    }

    doLogout() {
        this.open();

        // open the user's menu
        this.userIcon.waitForExist();
        this.userIcon.click();

        this.logoutLink.click();
    }
}

export default Dashboard;
export const dashboardPage = new Dashboard();
