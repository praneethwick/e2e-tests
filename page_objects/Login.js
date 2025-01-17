import Page from './Page';
import { waitForElementToExist, waitForVisible } from '#support/wait';
import { header } from './Header';

class Login extends Page {
  get loginForm () { return browser.$('#loginForm'); }
  get loginMessage () { return browser.$('#loginMessage'); }
  get usernameInput () { return browser.$('#j_username'); }
  get passwordInput () { return browser.$('#j_password'); }
  get submitButton () { return browser.$('input[type=submit]'); }

  open () {
    super.open('dhis-web-commons/security/login.action');
  }

  doLogin (username, password) {
    this.open();
    waitForElementToExist(this.loginForm);
    this.usernameInput.setValue(username);
    this.passwordInput.setValue(password);
    this.submitButton.click();
    // todo uncomment when login no longer redirects to /files/external/script
    //waitForElementToExist( header.headerElement);
  }
}

export default Login;
export const loginPage = new Login();
