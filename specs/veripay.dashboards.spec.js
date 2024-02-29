import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login";
import { VeripayDashboards } from "../pages/veripay-dashboards";
import defineConfig from "../playwright.config";

test("Dashboard page can be loaded successfully", async ({ page }) => {
  const Login = new LoginPage(page);
  const Dashboards = new VeripayDashboards(page);
  await test.step("Login", async () => {
    await Login.gotoLoginPage();
    await Login.login(defineConfig.username, defineConfig.password);
  });
  await test.step("Open Veripay Dashboard page", async () => {
    await Dashboards.goDirectlyToTheVeripayDashboardsPage();
    await page.pause();
  });
  await test.step("Assert that breadcrumbs contain Dashboard breadcrumb", async () => {
    await Dashboards.assertBreadcrumbsContainsDashboard();
  });
});
