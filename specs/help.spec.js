// import { test, expect } from "@playwright/test";
// import { HelpPage } from "../pages/help";
// import { Helpers } from "../helpers.js";

// import defineConfig from "../playwright.config";

// test("Perform search by random section name from test file and verify appropriate section opened", async ({
//   page,
// }) => {
//   const HelpPageBunch = new HelpPage(page);
//   const searchKeyword = await Helpers.getRandomElement(
//     await Helpers.asyncReadFile("test-data/searchRequests.txt")
//   );
//   console.log(searchKeyword);
//   await test.step("Navigate to the Bunch Help page", async () => {
//     await HelpPageBunch.gotoHelpPage();
//   });

//   await test.step("Perform search using random search request from the test file", async () => {
//     await HelpPageBunch.performSearchByKeyword(searchKeyword);
//     await page.pause();
//   });

//   await test.step("Verify appropriate page opened", async () => {
//     await HelpPageBunch.verifyAppropriateHeaderDisplayed(searchKeyword);
//   });
// });

// test("Click on random section from the grid, open random article and verify appropriate information displayed", async ({
//   page,
// }) => {
//   const HelpPageBunch = new HelpPage(page);
//   await test.step("Navigate to the Bunch Help page", async () => {
//     await HelpPageBunch.gotoHelpPage();
//   });
//   await test.step("Click on any section and verify aproppriate collection of articles opened", async () => {
//     await HelpPageBunch.clickOnAnyGridOption();
//   });
//   await test.step("Click on any article and verify user redirected to apropriate article", async () => {
//     await HelpPageBunch.clickOnAnyItemAndVeriffyAppropriatePageOpened();
//   });
// });
