import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjects/login.po';
import { ContactPage } from '../pageObjects/contact.po';
const { authenticationUser: authenticateUser, createEntity } = require('../utils/helper.spec');const testData = require('../fixtures/loginFixture.json');
const contacttestData = require('../fixtures/contactFixture.json');
test.beforeEach(async({page}) => {
    const login = new LoginPage(page);
    await page.goto('/');
    await login.login(testData.validUser.userName, testData.validUser.password);
    await login.verifyValidLogin();
})
test.describe('Contact testcases', () =>{
    test('Contact Add test', async ({ page, request}) => {
        const contact = new ContactPage(page);
        await contact.contactAdd(contactTestData.contact.firstName, contactTestData.contact.lastName);
        await contact.viewContact();
        await contact.validateContactCreated(contactTestData.contact.firstName, contactTestData.contact.lastName);
        accessToken = await authenticationUser(testData.validUser.userName, testData.validUser.password);
        const id = await getEntity(accessToken, '/contacts', '200', {request});
        await deleteEntity(accessToken,'/contacts/$(id)',{request});
        await validateEntity(accessToken,'/contacts/$(id)','404', {request});
    })
    test('Contact Edit test', async ({ page, request}) => {
        const Data = {
                  birthdate: "2009/05/12",
                    city: "Kathmandu",
                    country: "Nepal",
                    email: "bipashamaharjan4@gmail.com",
                    firstName: "Bipasha",
                    lastName: "Maharjan",
                    phone: "9818329724",
                    postalCode: "123",
                    stateProvince: "Bagmati",
                    street1: "Teku"

        };
        
        const contact = new ContactPage(page);
        accessToken = await authenticateUser(testData.validUser.userName, testData.validUser.password,{request})
        await createEntity(Data, accessToken, '/contacts', {request});
        page.reload();
        await contact.viewContact();
        await contact.contactEdit(contactTestData.contactEdit.firstName);
        await contact.validateContactCreated(contactTestData.contactEdit.firstName, contactTestData.contact.lastName,contact);
    })
        test.only('Contact Delete test', async ({ page, request}) => {
        const Data = {
                  birthdate: "2009/05/12",
                    city: "Kathmandu",
                    country: "Nepal",
                    email: "bipashamaharjan4@gmail.com",
                    firstName: "Bipasha",
                    lastName: "Maharjan",
                    phone: "9818329724",

        };
        
        const contact = new ContactPage(page);
        accessToken = await authenticateUser(testData.validUser.userName, testData.validUser.password,{request})
        await createEntity(Data, accessToken, '/contacts', {request});
        page.reload();
        await contact.viewContact();
        const id= await getEntity(accessToken, '/contacts', '200', { request });
        await contact.contactDelete();
        await validateEntity(accessToken, '/contacts', '404', { request });
    })
})
test.afterEach(async({page})=> {
    await page.close();
})

/*import { test } from '@playwright/test';
import { LoginPage } from '../project objects/login.po';
import { ContactPage } from '../project objects/contact.po';
const testData = require('../fixtures/loginFixture.json');
const contactTestData = require('../fixtures/contactFixture.json');

test.beforeEach(async({page}) =>{
    const login = new LoginPage(page);
    await page.goto('/');
    await login.login(testData.validUser.username, testData.validUser.password);
    await login.verifyValidLogin();

})

test.describe('Contact testcase',()=>{
    test('contact Add test', async({page, request})=>{
        const contact = new ContactPage(page);
        await contact.contactAdd(contactTestData.contact.firstName, contactTestData.contact.lastName );
        await contact.viewContact();
        await contact.validateContactCreated(contactTestData.contact.firstName, contactTestData.lastName)
    })
})
*/
/* const { expect } = require("@playwright/test");

exports.ContactPage = class ContactPage {
    constructor(page) {
        this.page = page;

        // Form fields
        this.addContact = '#add-contact';
        this.firstName = '#firstName';
        this.lastName = '#lastName';
        this.dob = 'input[placeholder="yyyy-MM-dd"]';
        this.email = '#email';
        this.phone = '#phone';
        this.address = 'input[placeholder="Address 1"]';
        this.city = '#city';
        this.state = 'input[placeholder="State or Province"]';
        this.postal = '#postal';
        this.country = 'input[placeholder="Country"]';
        this.Save = '#submit';

        // Saved contact view selectors (updated)
        this.savedFirstName = '#saved-firstName';
        this.savedLastName = '#saved-lastName';
        this.savedDOB = '#saved-dob';
        this.savedEmail = '#saved-email';
        this.savedPhone = '#saved-phone';
        this.savedAddress = '#saved-address';
        this.savedCity = '#saved-city';
        this.savedState = '#saved-state';
        this.savedPostal = '#saved-postal';
        this.savedCountry = '#saved-country';

        // Actions
        this.editContact = '#edit-contact';
        this.delete = '#delete';
        this.viewCreatedContact = '#view-contact';
    }

    async contactAdd(firstName, lastName, dateOfBirth, email, phone, address, city, state, postal, country) {
        await this.page.locator(this.addContact).click();
        await this.page.locator(this.firstName).fill(firstName);
        await this.page.locator(this.lastName).fill(lastName);
        await this.page.locator(this.dob).fill(dateOfBirth);
        await this.page.locator(this.email).fill(email);
        await this.page.locator(this.phone).fill(phone);
        await this.page.locator(this.address).fill(address);
        await this.page.locator(this.city).fill(city);
        await this.page.locator(this.state).fill(state);
        // await this.page.locator(this.postal).fill(postal);
        // await this.page.locator(this.country).fill(country);

        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'load' }),
            this.page.locator(this.Save).click()
        ]);
    }

    async viewContact() {
        await this.page.locator(this.viewCreatedContact).click();
    }

    async validateContactCreated(fName, lName, dob, email, phone, address, city, postal, state, country) {
        await expect(this.page.locator(this.savedFirstName)).toHaveText(fName);
        await expect(this.page.locator(this.savedLastName)).toHaveText(lName);
        await expect(this.page.locator(this.savedDOB)).toHaveText(dob);
        await expect(this.page.locator(this.savedEmail)).toHaveText(email);
        await expect(this.page.locator(this.savedPhone)).toHaveText(phone);
        await expect(this.page.locator(this.savedAddress)).toHaveText(address);
        await expect(this.page.locator(this.savedCity)).toHaveText(city);
        await expect(this.page.locator(this.savedPostal)).toHaveText(postal);
        await expect(this.page.locator(this.savedState)).toHaveText(state);
        await expect(this.page.locator(this.savedCountry)).toHaveText(country);
    }
}*/