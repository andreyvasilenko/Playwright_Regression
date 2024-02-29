import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login";
import { VeripayGrid } from "../pages/veripay-grid";
import defineConfig from "../playwright.config";

test("test name ", async ({ page }) => {
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
});
