import { Then } from '@cucumber/cucumber';
import { isVisible}  from '#support/check';
import { waitForElementToExist } from '#support/wait';
import { logout } from '#support/action';
import { loginPage } from '#page_objects/Login';
import { dashboardPage } from '#page_objects/analytics/Dashboard';

  Then(
    /^I should( not)? be authenticated$/,
    (falseCase) => {
      if (falseCase) {
        waitForElementToExist(loginPage.loginForm);
        isVisible(loginPage.loginForm);
        isVisible(loginPage.loginMessage);

        expect(loginPage.loginMessage.getText()).to.contain('Wrong username or password')
      } else {
        waitForElementToExist(dashboardPage.headerDiv);
        isVisible(dashboardPage.headerDiv);
      }
    }
  );

  Then(
    /^I expect that the login form is( not)* visible$/,
    (falseCase) => {
      console.log(falseCase);
      isVisible(loginPage.loginForm, falseCase);
      isVisible(loginPage.usernameInput, falseCase);
      isVisible(loginPage.passwordInput, falseCase);
      isVisible(loginPage.submitButton, falseCase);
    }
  );

  Then(
    /^I should be able to logout$/,
    logout
  );
