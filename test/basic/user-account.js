/**
 * Created on : 20/05/20
 * Author     : arioki
 * Name       : Yoga Setiawan
 * GitHub     : https://github.com/arioki
 */
import wd from 'wd';
import {EMAIL_ACCOUNT, PACKAGE_NAME, PASSWORD_ACCOUNT} from "../helpers/config";

const {asserters} = wd

exports.login = async (driver) => {
    // Find Button element and click on it
    await driver.elementById(PACKAGE_NAME + ':id/text_intro_next_step')
        .click();
    let btn_izinkan_id = `android:id/button1`;
    await driver.waitForElementById(btn_izinkan_id)
        .click();
    await driver.waitForElementById('com.android.packageinstaller:id/permission_allow_button')
        .click();
    await driver.waitForElementById('com.android.packageinstaller:id/permission_allow_button')
        .click();
    await driver.waitForElementById(btn_izinkan_id)
        .click();
    await driver.waitForElementById(PACKAGE_NAME + ':id/navigation_account')
        .click();
    await driver.waitForElementById(PACKAGE_NAME + ':id/button_login')
        .click()
    await driver.waitForElementById(PACKAGE_NAME + ':id/field_email')
        .sendKeys(EMAIL_ACCOUNT);
    await driver.waitForElementById(PACKAGE_NAME + ':id/field_password')
        .sendKeys(PASSWORD_ACCOUNT);
    await driver.waitForElementById(PACKAGE_NAME + ':id/button_login')
        .click()
    await driver.waitForElementById(PACKAGE_NAME + ':id/navigation_account', asserters.isDisplayed, 20000, 10)
}
