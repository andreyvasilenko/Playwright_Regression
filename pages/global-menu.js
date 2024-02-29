const { expect } = require("@playwright/test");

exports.GlobalMenu = class GlobalMenu {
  constructor(page) {
    this.page = page;
    this.globalFacilityFilterButton = page.locator(
      "xpath=//amp-facility-filter"
    );
    this.checkAllFacilitiesButton = page.locator(
      'xpath=//amp-button[@icon="filter-checked"]'
    );
    this.uncheckAllFacilitiesButton = page.locator(
      'xpath=//amp-button[@icon="filter-unchecked"]'
    );
    this.applyFacilityFilterButton = page
      .locator('xpath=//span[@class="amp-button__content ng-star-inserted"]')
      .filter({ hasText: "Apply" });
  }

  async openGlobalFacilityFilter() {
    await this.globalFacilityFilterButton.click();
  }

  async checkAllFacilitiesInFilter() {
    await this.checkAllFacilitiesButton.click();
    await expect(this.globalFacilityFilterButton).not.toHaveText('Facility Filter (0)');
  }

  async uncheckAllFacilitiesInFilter() {
    await this.uncheckAllFacilitiesButton.click();
    await expect(this.globalFacilityFilterButton).toHaveText('Facility Filter (0)');
  }

  async applySelectedFacilitiesInFilter() {
    await this.applyFacilityFilterButton.click();
  }
};
