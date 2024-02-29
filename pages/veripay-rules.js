const { expect } = require("@playwright/test");

exports.VeripayRules = class VeripayRules {
  constructor(page) {
    this.page = page;
    this.lastNameFilter = page.locator(
      'xpath=//div[@class="amp-input__wrapper"]/input'
    );
    this.lastNameFilterFCC = page.locator(
      'xpath=//div[@class="amp-input__wrapper"]/input'
    );
    this.rulesBreadcrumbs = page
      .getByRole("main")
      .getByRole("link", { name: "Rules", exact: true });
  }

  async goDirectlyToTheVeripayRulesPage() {
    await this.page.goto("./v2/veripay/settings/rules/automationrules");
  }

  async assertBreadcrumbsContainsRules() {
    await expect(this.rulesBreadcrumbs).toHaveCount(1);
  }
};
