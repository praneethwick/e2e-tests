import { login, getConsoleLog, getFilteredConsoleLog, saveScreenshot } from '#support/action';
import { waitForWindowToLoad } from '#support/wait';
import { appsList } from '#page_objects/AppsList';

describe('Apps -> DHIS2-8017', function() {
  before(() => {
    login(browser.config.superUser, browser.config.superUserPassword);

    appsList.open();
    const apps = appsList.list;
    let lastOpenedApp = "undefined-app";

    apps.forEach((app) => {

      const newTest = it('I open ' + app, function() {
        getConsoleLog(); // clear error log  before test
        console.log('opening app: ' + app);
    
        browser.url(app);
        waitForWindowToLoad();
    
        const consoleLogs = filteredConsolelog(lastOpenedApp);
        const reportLog = 'App: ' + app + ' has ' + consoleLogs.length + ' severe errors: \n' + JSON.stringify(consoleLogs, null, 1);
        lastOpenedApp = app;

        expect(consoleLogs.length, reportLog).to.equal(0)
      })

      this.tests.push(newTest)
    })
  }) 
  it('Dummy', function() {
    expect(0).to.equal(0);
  })
})

const filteredConsolelog = (lastOpenedApp) => {
  return getFilteredConsoleLog().filter((value) => {
    const message = value['message'];
    return !message.includes(lastOpenedApp)
  });
};