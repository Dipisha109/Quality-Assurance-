import { test } from '@playwright/test';
// test('Valid_login', async ({ page }) => {
//       await page.goto('https://www.facebook.com/'); //Opens URL Of website which we want to test
//       await page.getByPlaceholder('Email or phone number').fill('hbshdvg');
//       await page.getByPlaceholder('password').fill('sbha');
//       //await page.locator('[name= "login"]').click();
//       //await page.locator('input[@name="email"]');
      
//       await page.waitForTimeout(5000);
      
// });


test('Invalid_login', async ({ page }) => {
      await page.goto('https://www.facebook.com/'); //Opens URL Of website which we want to test
      await page.getByPlaceholder('Email or phone number').fill('hbshdvg');
      await page.getByPlaceholder('password').fill('sbha');
      //await page.locator('[name= "login"]').click();
      //await page.locator('input[@name="email"]');
      
      await page.waitForTimeout(5000);
      
});