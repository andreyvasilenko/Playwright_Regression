const { expect } = require("@playwright/test");

exports.HelpPage = class HelpPage {
  constructor(page) {
    this.page = page;
    this.searchBar = page.getByPlaceholder("Search for articles...");
    this.searchResults = page
      .locator('xpath=//div[@class="w-full"]//h3')
      .first();
    this.headerOnSearchResultsPage = page.locator(
      'xpath=//div[@class="article intercom-force-break"]//header'
    );
    this.gridOptions = page.locator(
      'xpath=//section[@data-testid="landing-section"]//h3'
    );
    this.headerOfOpenedCollection = page.locator(
      'xpath=//div[@class="flex flex-col"]//header'
    );
    this.itemsInsideCollection = page.locator("xpath=//div/a/div/span");
  }

  async gotoHelpPage() {
    await this.page.goto("./");
  }

  async performSearchByKeyword(keyword) {
    await this.searchBar.fill(keyword);
    await this.searchResults.click();
  }

  async verifyAppropriateHeaderDisplayed(keyword) {
    await expect.soft(this.headerOnSearchResultsPage).toBeVisible();
    const headerTextOnThePage =
      await this.headerOnSearchResultsPage.textContent();
    await expect.soft(headerTextOnThePage).toContain(keyword);
  }

  async clickOnAnyGridOption() {
    const rows = this.gridOptions;
    const count = await rows.count();
    const randomIndex = Math.floor(Math.random() * count);
    const headerOnTheGridPage = await rows.nth(randomIndex).textContent();
    console.log(headerOnTheGridPage);
    await rows.nth(randomIndex).click();
    await expect.soft(this.headerOfOpenedCollection).toBeVisible();
    const headerTextOnCollectionPage =
      await this.headerOfOpenedCollection.textContent();
    console.log(headerTextOnCollectionPage);
    await expect
      .soft(headerTextOnCollectionPage)
      .toContain(headerOnTheGridPage);
  }

  async clickOnAnyItemAndVeriffyAppropriatePageOpened() {
    const rows = this.itemsInsideCollection;
    const count = await rows.count();
    const randomIndex = Math.floor(Math.random() * count);
    const headerOfCollectionItem = await rows.nth(randomIndex).textContent();
    console.log(headerOfCollectionItem);
    await rows.nth(randomIndex).click();
    await expect.soft(this.headerOfOpenedCollection).toBeVisible();
    const headerTextOnCollectionPage =
      await this.headerOfOpenedCollection.textContent();
    console.log(headerTextOnCollectionPage);
    await expect
      .soft(headerTextOnCollectionPage)
      .toContain(headerOfCollectionItem);
  }
};
