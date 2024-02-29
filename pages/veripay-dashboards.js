const { expect } = require('@playwright/test');

exports.VeripayDashboards = class VeripayDashboards {

    constructor (page){
        this.page = page
        this.lastNameFilter = page.locator('xpath=//div[@class="amp-input__wrapper"]/input')
        this.lastNameFilterFCC = page.locator('xpath=//div[@class="amp-input__wrapper"]/input')
        this.dashboardBreadcrumbs = page.getByRole('main').getByRole('link', { name: 'Dashboard' })
    }

    async goDirectlyToTheVeripayDashboardsPage(){
        await this.page.goto('./v2/veripay/dashboard');
    }

    async assertBreadcrumbsContainsDashboard(){
    await expect(this.dashboardBreadcrumbs).toHaveCount(1);
    }
}