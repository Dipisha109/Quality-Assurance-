const { expect } = require("@playwright/test");

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = '#email';
    this.passwordInput = '//input[@placeholder="Password"]'; // fixed typo in selector
    this.loginButton = '//button[@id="submit"]';
    this.logOut = '//button[@id="Logout"]';
    this.loginValidation = '//p[contains(text(),"Click on any contact to view the Contact Details")]';
    this.alertMessage = '//span[@id="error"]';
  }

  async login(username, password) {
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.usernameInput).fill(username);
    await this.page.locator(this.passwordInput).fill(password); // fixed space in this.passwordInput
    await this.page.locator(this.loginButton).click();
  }

  async verifyValidLogin() {
    const loginValidationLocator = this.page.locator(this.loginValidation);
    await this.page.waitForTimeout(2000);
    expect(this.logOut). toBeVisible; // fixed to use locator
    await expect(loginValidationLocator).toHaveText('Click on any contact to view the Contact Details');
  }

  async verifyInvalidLogin(){
    const InvalidLogin = await this.page.locator(this.alertMessage);
    await expect(InvalidLogin).toHaveText('Incorrect username or password');
  }
};
