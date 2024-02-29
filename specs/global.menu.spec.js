import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login";
import { GlobalMenu } from "../pages/global-menu";
import defineConfig from "../playwright.config";

test("Global facility filter - check/uncheck all ", async ({ page }) => {
  const Login = new LoginPage(page);
  const GlobalButtons = new GlobalMenu(page);

  await test.step("Login", async () => {
    await Login.gotoLoginPage();
    await Login.login(defineConfig.username, defineConfig.password);
    page.pause();
  });
  await test.step("Open Facility filter", async () => {
    await GlobalButtons.openGlobalFacilityFilter();
  });
  await test.step("Click Uncheck all button and verify selected Facility filter countetr = 0", async () => {
    await GlobalButtons.uncheckAllFacilitiesInFilter();
  });
  await test.step("Click Check all button and verify selected Facility filter countetr changed", async () => {
    await GlobalButtons.checkAllFacilitiesInFilter();
  });
  await test.step("Apply Facility filter", async () => {
    await GlobalButtons.applySelectedFacilitiesInFilter();
  });
});
