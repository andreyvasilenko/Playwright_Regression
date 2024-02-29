import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login";
// import { VeripayDashboards } from '../pages/veripay-dashboards';
import { VeripayRules } from "../pages/veripay-rules";

import defineConfig from "../playwright.config";

test("Rules page can be loaded successfully", async ({ page }) => {
  const Login = new LoginPage(page);
  const Rules = new VeripayRules(page);
  await test.step("Login", async () => {
    await Login.gotoLoginPage();
    await Login.login(defineConfig.username, defineConfig.password);
  });
  await test.step("Open Veripay Rules page", async () => {
    await Rules.goDirectlyToTheVeripayRulesPage();
    await page.pause();
  });
  await test.step("Assert that breadcrumbs contain Rules breadcrumb", async () => {
    await Rules.assertBreadcrumbsContainsRules();
  });
});
