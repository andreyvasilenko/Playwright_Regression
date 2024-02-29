const { expect } = require("@playwright/test");
const caseNameOnTheCaseDetailsPage = "";

exports.VeripayCaseDetails = class VeripayCaseDetails {
  constructor(page) {
    this.page = page;
    this.veripayCaseTitle = page.locator(
      'xpath=//span[@class="page__title-content"]'
    );
  }

  async getTextOfTheTitle() {
    caseNameOnTheCaseDetailsPage = await this.veripayCaseTitle().textContent();
    console.log(VeripayCase.veripayCaseTitle.textContent());
  }

  async verifyCaseIdTheSame(idFromGrid) {
    await expect(this.veripayCaseTitle.textContent()).toContain(idFromGrid);
  }
};
