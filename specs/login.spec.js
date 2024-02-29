import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login";
import defineConfig from "../playwright.config";

test("Login to an account", async ({ page }) => {
  const Login = new LoginPage(page);
  await test.step("Login", async () => {
    await Login.gotoLoginPage();
    await Login.login(defineConfig.username, defineConfig.password);
    page.pause();
  });
  await test.step("Verify user successfully Logged In", async () => {
    await Login.goDirectlyToAccountPage();
    page.pause();
    await Login.verifyUserSignedIn();
  });
});
