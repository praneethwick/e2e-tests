import { login, getConsoleLog, getFilteredConsoleLog } from '#support/action';
import { dashboardPage } from '#page_objects/analytics/Dashboard';
import { waitForWindowToLoad } from '#support/wait';

describe('Dashboards app -> DHIS2-8010', function() {
  before(() => {
    this.timeout(100000);//haack, but dhis2 is so slow  :(
    login(browser.config.superUser, browser.config.superUserPassword);
    waitForWindowToLoad();
    const filters = dashboardPage.filters;

    filters.forEach((filter) => {
        const filterName = filter.$('span span span').getHTML(false);
        
        const newTest = it('I open ' + filterName, function() {
           // getText() returns empty string for invisible filters.
          const filterHref = filter.getAttribute('href');

          getConsoleLog(); // clear browser log before test
          console.log('opening ' + filterName);
          
          browser.url(filterHref);
          waitForWindowToLoad();

          const consoleLogs = getFilteredConsoleLog();
          const reportLog = 'Filter: ' + filterName + ' has ' + consoleLogs.length + ' severe errors: \n' + JSON.stringify(consoleLogs, null, 1);

          expect(consoleLogs.length, reportLog).to.equal(0);
      })

      this.tests.push(newTest)
    })
  }) 
  
  it('1. I open dashboard app', function() {
    dashboardPage.open();

    expect(dashboardPage.filters.length).to.be.above(0);
  })

})
