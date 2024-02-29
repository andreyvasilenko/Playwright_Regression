const { expect } = require("@playwright/test");

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailField = page.getByPlaceholder("Email or Domain\\Username");
    this.passwordField = page.getByPlaceholder("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.userAvatarLocator = page.locator('xpath=//span[@class="amp-avatar"]');
  }

  async gotoLoginPage() {
    await this.page.goto("./");
  }

  async login(username, password) {
    await this.emailField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async goDirectlyToAccountPage() {
    await this.page.goto("./v2/account/profile/details");
  }

  async verifyUserSignedIn() {
    await this.page.waitForTimeout(4000);
    await expect(this.userAvatarLocator).toBeVisible();
  }
};
