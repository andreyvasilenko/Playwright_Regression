const { expect } = require("@playwright/test");
const caseNameOnTheGrid = "";

exports.VeripayGrid = class VeripayGrid {
  constructor(page) {
    this.page = page;
    this.expandVeripayButtonLeftNavigationMenu = page.getByRole("link", {
      name: "Veripay",
    });
    this.casesButtonLeftNavMenu = page.getByRole("link", { name: "Cases" });
    this.caseIncomesButtonLeftNavMenu = page.getByRole("link", {
      name: "Case Incomes",
    });
    this.caseAssetsButtonLeftNavMenu = page.getByRole("link", {
      name: "Case Assets",
    });
    this.casePayersButtonLeftNavMenu = page.getByRole("link", {
      name: "Case Payers",
    });
    this.createCaseButton = page.getByRole("button", { name: "Create Case" });
    this.facilitySelector = page.getByRole("button", { name: "Select" });
    this.searchForDemoFacility = page.getByPlaceholder("Filter");
    this.demoButton = page.getByText("Demo", { exact: true });
    this.advancedRehabButton = page.getByText("Advanced Rehab", {
      exact: true,
    });
    this.lastNameField = page.getByLabel("* Last Name:");
    this.ssnNumber = page.getByPlaceholder("___-__-____");
    this.continueCreatingCase = page.getByRole("button", { name: "Continue" });
    this.createVeripayCase = page.getByRole("button", {
      name: "Create New Resident",
    });
    this.actionButtonOnTheVeripayCasesGrid = page.locator(
      'xpath=//amp-button[@icon="chevron-down"]'
    );
    this.resetView = page.getByText("Reset View");
    this.fullNameFilter = page
      .locator("amp-header-cell")
      .filter({ hasText: "Full Name" })
      .getByRole("img")
      .first();
    this.lastNameFilter = page.locator(
      'xpath=//div[@class="amp-input__wrapper"]/input'
    );
    this.lastNameFilterFCC = page.locator(
      'xpath=//div[@class="amp-input__wrapper"]/input'
    );
    this.applyFilter = page.getByRole("button", { name: "Apply" });
    this.columnsConfigurationsButton = page
      .locator('xpath=//span[@class="mat-mdc-menu-item-text"]/span/span')
      .filter({ hasText: "Columns" });
    this.columnFacilitySelector = page
      .locator('xpath=//div[@id="columns"]//span/span')
      .filter({ hasText: "Facility" });
    this.sectionToDragForGroupping = page.locator("#group");
    this.applyButtonInColumnsConfig = page
      .locator('xpath=//span[@class="amp-button__content ng-star-inserted"]')
      .filter({ hasText: "Apply" });
    this.groupsByCensusActive = page
      .locator('xpath=//div[@class="amp-grid-table__row ng-star-inserted"]')
      .filter({ hasText: ": Active" });
    this.groupsByCensusInactive = page
      .locator('xpath=//div[@class="amp-grid-table__row ng-star-inserted"]')
      .filter({ hasText: "Inactive" });
    this.veripayCasesList = page.locator(
      'xpath=//div[@data-column-definition-name="#"]//span/a'
    );
  }

  async goDirectlyToTheVeripayGridPage() {
    await this.page.goto("./v2/veripay/cases");
  }

  async expandVeripaySection() {
    await this.expandVeripayButtonLeftNavigationMenu.click();
  }

  async navigateToTheCasesGrid() {
    await this.expandVeripayButtonLeftNavigationMenu.click();
    await this.casesButtonLeftNavMenu.click();
  }

  async navigateToTheIncomesGrid() {
    await this.expandVeripayButtonLeftNavigationMenu.click();
    await this.caseIncomesButtonLeftNavMenu.click();
  }

  async navigateToTheAssetsGrid() {
    await this.expandVeripayButtonLeftNavigationMenu.click();
    await this.caseAssetsButtonLeftNavMenu.click();
  }

  async navigateToThePayersGrid() {
    await this.expandVeripayButtonLeftNavigationMenu.click();
    await this.casePayersButtonLeftNavMenu.click();
  }

  async clickCreateVeripayCase() {
    await this.createCaseButton.click();
  }

  async selectAppropriateFacility(facilityName) {
    await this.facilitySelector.click();
    await this.searchForDemoFacility.click();
    await this.page.keyboard.type(facilityName);
    const currentURL = this.page.url();
    if (currentURL.includes("fcc")) {
      await this.advancedRehabButton.click();
    } else {
      await this.demoButton.click();
    }
  }

  async fillInRequiredInformationVeripayCases() {
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    await this.lastNameField.click();
    await this.lastNameField.fill("autoCreated" + getRandomInt(10000));
    await this.ssnNumber.click();
    await this.ssnNumber.fill("autoCreated" + getRandomInt(1000000000));
  }

  async confirmAndCreateNewCase() {
    await this.continueCreatingCase.click();
    await this.createVeripayCase.click();
  }

  async resetViewOnTheVeripayCases() {
    await this.actionButtonOnTheVeripayCasesGrid.click();
    await this.resetView.click();
  }

  async openFullNameFilter() {
    await this.fullNameFilter.click();
  }

  async enterKeywordInTheFullNameFilter(keyword) {
    const currentURL = this.page.url();
    if (currentURL.includes("fcc")) {
      await this.lastNameFilterFCC.first().click;
      await this.lastNameFilterFCC.first().fill(keyword);
    } else {
      await this.lastNameFilter.first().click;
      await this.lastNameFilter.first().fill(keyword);
    }
  }

  async applyFullNameFilter() {
    await this.applyFilter.click();
  }

  async openColumnsConfigurationMenu() {
    await this.actionButtonOnTheVeripayCasesGrid.click();
    await this.columnsConfigurationsButton.click();
  }

  async clickApplyColumnsConfig() {
    await this.applyButtonInColumnsConfig.click();
  }

  async verifyGroppingApplied() {
    await expect(this.groupsByCensusActive).toBeVisible();
    await expect(this.groupsByCensusInactive).toBeVisible();
  }

  async clickOnRandomVeripayCase() {
    const rows = this.veripayCasesList();
    const counter = await rows.count();
    console.log(counter);

    const randomIndex = Math.floor(Math.random() * (counter + 1));
    console.log(randomIndex);s

    console.log(await rows.nth(randomIndex).textContent());
    const caseIdOnTheGrid = await rows.nth(randomIndex).textContent();

    await rows.nth(randomIndex).click();
  }

  async clickOnRandomVeripayCase() {
    // const rows = await this.veripayCasesList();
    const counter = await this.veripayCasesList().count();
    console.log(counter);

    const randomIndex = Math.floor(Math.random() * (counter));
    console.log(randomIndex);

    console.log(await this.veripayCasesList().nth(randomIndex).textContent());
    // const caseIdOnTheGrid = await rows.nth(randomIndex).textContent();
    caseNameOnTheGrid = await this.veripayCasesList().nth(randomIndex).textContent();

    await this.veripayCasesList().nth(randomIndex).click();
  }
};
