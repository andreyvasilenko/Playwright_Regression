import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login";
import { VeripayGrid } from "../pages/veripay-grid";
import { VeripayCaseDetails } from "../pages/veripay-case-details";
import defineConfig from "../playwright.config";

test("Create a Veripay Case from the Cases Grid", async ({ page }) => {
  const Login = new LoginPage(page);
  const Veripay = new VeripayGrid(page);
  await test.step("Login", async () => {
    await Login.gotoLoginPage();
    await Login.login(defineConfig.username, defineConfig.password);
  });
  await test.step("Open Veripay Grid page and reset view", async () => {
    await Veripay.goDirectlyToTheVeripayGridPage();
    await page.pause();
    await Veripay.resetViewOnTheVeripayCases();
    await page.pause();
  });
  await test.step("Select falicilty and fill in all required information", async () => {
    const currentURL = page.url();
    let facilityName;
    if (currentURL.includes("fcc")) {
      facilityName = "Advanced";
    } else {
      facilityName = "Demo";
    }
    await Veripay.clickCreateVeripayCase();
    await Veripay.selectAppropriateFacility(facilityName);
    await Veripay.fillInRequiredInformationVeripayCases();
    await page.pause();
  });
  await test.step("Click Continue and Click create case button", async () => {
    await Veripay.confirmAndCreateNewCase();
  });
  await test.step("Verify the case successfully created and newly created Case opened", async () => {
    const currentURL = page.url();
    if (currentURL.includes("fcc")) {
      await expect(page.locator("text=Case Owner: AndriiQA")).toHaveCount(1);
    } else if (currentURL.includes("deploytest")) {
      await expect(page.locator("text=Case Owner: avasylenko_qa")).toHaveCount(
        1
      );
    } else {
      await expect(page.locator("text=Case Owner: Andrii")).toHaveCount(1);
    }
    await expect(page.locator("text=VeripayCasesDetails")).toHaveCount(1);
  });
});

test("Apply Filter by lastname Autocreated Cases", async ({ page }) => {
  const Login = new LoginPage(page);
  const Veripay = new VeripayGrid(page);
  await test.step("Login", async () => {
    await Login.gotoLoginPage();
    await Login.login(defineConfig.username, defineConfig.password);
  });
  await test.step("Open Veripay Grid page and reset view", async () => {
    await Veripay.goDirectlyToTheVeripayGridPage();
    await page.pause();
    await Veripay.resetViewOnTheVeripayCases();
    await page.pause();
  });
  await test.step("Apply Groupping", async () => {
    await Veripay.openFullNameFilter();
    await Veripay.enterKeywordInTheFullNameFilter("Autocreated");
    await Veripay.applyFullNameFilter();
    await page.pause();
  });
  await test.step("Assert each case name contain Autocreated", async () => {
    const rows = page.locator(
      'xpath=//div[@data-column-definition-name="fullName"]//span/a'
    );
    const count = await rows.count();
    for (let i = 0; i < count; ++i) {
      console.log(await rows.nth(i).textContent());
      const caseName = await rows.nth(i).textContent();
      expect.soft(caseName).toContain("Autocreated");
    }
  });
});

test("Apply groupping by facility column", async ({ page }) => {
  const Login = new LoginPage(page);
  const Veripay = new VeripayGrid(page);
  await test.step("Login", async () => {
    await Login.gotoLoginPage();
    await Login.login(defineConfig.username, defineConfig.password);
  });
  await test.step("Open Veripay Grid page and reset view", async () => {
    await Veripay.goDirectlyToTheVeripayGridPage();
    await page.pause();
    await Veripay.resetViewOnTheVeripayCases();
    await page.pause();
  });
  await test.step("Open Columns cofiguration page", async () => {
    await Veripay.openColumnsConfigurationMenu();
    await page.pause();
  });
  await test.step("Drag and drop column", async () => {
    await page
      .locator('xpath=//div[@class="cdk-drag drop-item ng-star-inserted"]')
      .filter({ hasText: "Census Status" })
      .hover();
    await page.mouse.down();
    await page.locator("#group").hover();
    await page.locator("#group").hover();
    await page.mouse.up();
  });
  await test.step("Apply Groupping", async () => {
    await Veripay.clickApplyColumnsConfig();
    await page.pause();
  });
  await test.step("Verify Groupping successfully applied", async () => {
    await Veripay.verifyGroppingApplied();
  });
});

test("click on random veripay case from the list", async ({ page }) => {
  const Login = new LoginPage(page);
  const Veripay = new VeripayGrid(page);
  const VeripayCase = new VeripayCaseDetails(page);
  await test.step("Login", async () => {
    await Login.gotoLoginPage();
    await Login.login(defineConfig.username, defineConfig.password);
  });
  await test.step("Open Veripay Grid page and reset view", async () => {
    await Veripay.goDirectlyToTheVeripayGridPage();
    await page.pause();
    await Veripay.resetViewOnTheVeripayCases();
    await page.pause();
  });
  await test.step("Click on random Veripay Case", async () => {
    const VeripayCase = new VeripayCaseDetails(page);
    const rows = page.locator(
      'xpath=//div[@data-column-definition-name="#"]//span/a'
    );
    const counter = await rows.count();
    console.log(counter);
    //1-25
    // const randomIndex = Math.floor(Math.random() * (counter + 1));
    //0-24
    const randomIndex = Math.floor(Math.random() * counter);
    console.log(randomIndex);

    console.log(await rows.nth(randomIndex).textContent());
    const caseIdOnTheGrid = await rows.nth(randomIndex).textContent();

    await rows.nth(randomIndex).click();

    await page.pause();
    VeripayCase.verifyCaseIdTheSame(caseIdOnTheGrid);
  });
});
