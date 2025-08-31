const { expect } = require("@playwright/test");

exports.ContactPage = class ContactPage {
  constructor(page) {
    this.page = page;

    // Action buttons
    this.addContact = page.getByRole('button', { name: 'Add a New Contact' });
    this.save = page.locator('#submit');
    this.editContact = page.locator('#edit-contact');
    this.delete = page.locator('#delete');

    // Form fields
    this.firstName = page.locator('#firstName');
    this.lastName = page.locator('#lastName');
    this.dob = page.getByPlaceholder('yyyy-MM-dd');
    this.email = page.locator('#email');
    this.phone = page.locator('#phone');
    this.address = page.locator('#street1');
    this.city = page.locator('#city');

    // Saved fields (on details page)
    this.savedFirstName = page.locator('#firstName');
    this.savedLastName = page.locator('#lastName');
    this.savedDOB = page.locator('#dob'); // Make sure this ID exists
    this.savedEmail = page.locator('#email');
    this.savedPhone = page.locator('#phone');
    this.savedAddress = page.locator('#street1');
    this.savedCity = page.locator('#city');
  }

  async contactAdd(contact) {
    await this.addContact.click();
    await this.firstName.fill(contact.firstName);
    await this.lastName.fill(contact.lastName);
    await this.dob.fill(contact.dateOfBirth);
    await this.email.fill(contact.email);
    await this.phone.fill(contact.phone);
    await this.address.fill(contact.address);
    await this.city.fill(contact.city);
    await this.save.click();
  }

async viewContact(contact) {
  const fullName = `${contact.firstName} ${contact.lastName}`;
  const contactLocator = this.page.locator(`text=${fullName}`);

  await contactLocator.waitFor({ state: 'visible' });
  await contactLocator.first().click();
}

  async contactEdit(firstName){
    await this.page.locator(this.editContact).click();
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.firstName).clear();
    await this.page.locator(this.firstName).fill(firstName);
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.save).click();
  }

  async contactDelete(){
    await this.page.waitForTimeout(2000);
    this.page.once('dialog', async dialog =>{
      console.log('Dialog message: ${dialog.message()}');
      await dialog.accept(); //use dialog.dismiss() if ypu want to cancel instead
    });
    await this.page.locator(this.deleteContact).click();
  }

  async validateContactCreated(contact) {
    await expect(this.savedFirstName).toHaveText(contact.firstName);
    await expect(this.savedLastName).toHaveText(contact.lastName);
    await expect(this.savedDOB).toHaveText(contact.dateOfBirth);
    await expect(this.savedEmail).toHaveText(contact.email);
    await expect(this.savedPhone).toHaveText(contact.phone);
    await expect(this.savedAddress).toHaveText(contact.address);
    await expect(this.savedCity).toHaveText(contact.city);
  }
};
/*const {expect}= require("@playwright/test");


exports.ContactPage= class ContactPage{
    constructor(page){
        this.page=page;
        // this.addContact = this.page.getByRole('button', { name: 'Add a New Contact' });
        this.addContact = '#add-contact';
        this.firstName= '#firstName';
        this.lastName= '#lastName';
        this.dob = 'input[placeholder="yyyy-MM-dd"]';
        this.email='//input[@id="email"]' ;
        this.save='//button[@id="submit"]';
        this.savedFirstName='//span[@id="firstName"]';
        this.savedLastName='//span[@id="lastName"]';
        this.savedEmail='//span[@id="email"]';
        this.savedPhone='//span[@id="phone"]';
        this.savedAddress='//span[@id="street1"]';
        this.savedCity='//span[@id="city"]';
        this.editContact='//button[@id="edit-contact"]';
        this.delete='//button[@id="delete"]';

    }

    async contactAdd(firstName,lastName,dateOfBirth, email, phone, address, city ){
        await this.page.locator(this.addContact).click();
        await this.page.locator(this.firstName).fill(firstName);
        await this.page.locator(this.lastName).fill(lastName);
        await this.dob.fill(dateOfBirth);
        await this.page.locator(this.email).fill(email);
        await this.page.locator(this.phone).fill(phone);
        await this.page.locator(this.address).fill(address);
        await this.page.locator(this.city).fill(city);
        await this.page.waitForTimeout(3000);
        await this.page.locator(this.save).click();

    }

    async validateContactCreated(fName, lName, dob, email, phone, address, city, state ){

        const fNameValidation = await this.page.locator(this.savedFirstName);
        const lNameValidation = await this.page.locator(this.savedLastName);
        const dobValidation = await this.page.locator(this.savedDOB);
        const emailValidation = await this.page.locator(this.savedEmail);
        const phoneValidation = await this.page.locator(this.savedPhone);
        const addressValidation = await this.page.locator(this.savedAddress);
        const cityValidation = await this.page.locator(this.savedCity);
        await expect(fNameValidation).toHaveText(fName);
        await expect(lNameValidation).toHaveText(lName);
        await expect(dobValidation).toHaveText(dob);
        await expect(emailValidation).toHaveText(email);
        await expect(phoneValidation).toHaveText(phone);
        await expect(addressValidation).toHaveText(address);
        await expect(cityValidation).toHaveText(city);
        
    }

    async viewContact(){
        await this.page.locator(this.viewCreatedContact).click();
    }
}*/

/*const { expect } = require("@playwright/test");

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