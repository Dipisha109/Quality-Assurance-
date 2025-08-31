import { test } from '@playwright/test';
import { LoginPage } from '../project objects/login.po'; // this is from loginpo export but here we import
const testData = require('../fixtures/loginFixture.json');



test.beforeEach(async({page})=>{ // change in everything at once not one-one
    await page.goto('/'); // calls baseurl 

})

test.describe('Valid login tests', ()=>{
    test('login using valid username and password ', async ({page})=>{
        const Login = new LoginPage(page); // object to function call 
        await Login.login(testData.validUser.username, testData.validUser.password); // we can send username and password from here
        await Login.verifyValidLogin(); // normal function as there is not parameterized 12345qwert
    });

    
})

test.describe('Invalid login tests', ()=>{
    test('login using invalid username and valid password ', async ({page})=>{
        const Login = new LoginPage(page); // object to function call 
        await Login.login(testData.invalidUser.username, testData.validUser.password); // we can send username and password from here
        await Login.verifyInvalidLogin(); // normal function as there is not parameterized 
    });

    test('login using valid username and invalid password ', async ({page})=>{
        const Login = new LoginPage(page); // object to function call 
        await Login.login(testData.validUser.username, testData.invalidUser.password); // we can send username and password from here
        await Login.verifyInvalidLogin(); // normal function as there is not parameterized 
    });

     test('login using invalid username and invalid password ', async ({page})=>{
        const Login = new LoginPage(page); // object to function call 
        await Login.login(testData.invalidUser.username, testData.invalidUser.password); // we can send username and password from here
        await Login.verifyInvalidLogin(); // normal function as there is not parameterized 
    });

     test('login using no username and no password ', async ({page})=>{
        const Login = new LoginPage(page); // object to function call 
        await Login.login(" "," "); // we can send username and password from here
        await Login.verifyInvalidLogin(); // normal function as there is not parameterized 
    });
})