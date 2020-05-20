/**
 * Created on : 20/05/20
 * Author     : arioki
 * Name       : Yoga Setiawan
 * GitHub     : https://github.com/arioki
 */
import wd from 'wd';
import {
    androidApiDemos,
    androidCaps,
    PACKAGE_NAME,
    SAUCE_ACCESS_KEY,
    SAUCE_TESTING,
    SAUCE_USERNAME,
    serverConfig
} from '../helpers/config';

const {swipeLeft} = require("../helpers/swipe");

const {ENV} = require("../helpers/config");

const {swipeRight} = require("../helpers/swipe");

const {login} = require("./user-account");
const {asserters} = wd
const START_ACTIVITY = '.app.activity.main.SplashScreenActivity';
const OnBoardingActivity = '.app.activity.main.OnBoardingActivity'
describe('Test Call One On One', function () {
    this.enableTimeouts(false)
    let driver;
    let allPassed = true;

    before(async function () {
        // Connect to Appium server
        driver = SAUCE_TESTING
            ? await wd.promiseChainRemote(serverConfig)
            : await wd.promiseChainRemote(serverConfig, SAUCE_USERNAME, SAUCE_ACCESS_KEY);

        // add the name to the desired capabilities
        const sauceCaps = SAUCE_TESTING ? {name: 'Test Call One On One',} : {};

        // merge all the capabilities
        const caps = {
            ...androidCaps,
            ...sauceCaps,
            appWaitDuration: 10000,
            app: androidApiDemos,
            appWaitActivity: OnBoardingActivity, // Android-specific capability. Can open a specific activity.
            appActivity: START_ACTIVITY, // Android-specific capability. Can open a specific activity.
        };

        // Start the session, merging all the caps
        await driver.init(caps);
    });

    afterEach(function () {
        // keep track of whether all the tests have passed, since mocha does not do this
        allPassed = allPassed && (this.currentTest.state === 'passed');
    });

    after(async function () {
        await driver.quit();
        if (SAUCE_TESTING && driver) {
            await driver.sauceJobStatus(allPassed);
        }
    });

    it('Login and Lauch Chat', async function () {
        await login(driver)
        //Click menu account
        await driver.waitForElementById(PACKAGE_NAME + ':id/navigation_account')
            .click();
        //Click Room Chat
        await driver.waitForElementById(PACKAGE_NAME + ':id/constraintLayout_room_chat')
            .click();
        await driver.waitForElementById('com.android.packageinstaller:id/permission_allow_button')
            .click();
        await driver.waitForElementById('com.android.packageinstaller:id/permission_allow_button')
            .click();
        //Wait chat room
        await driver.waitForElementById(PACKAGE_NAME + ':id/ll_chat_room_button', asserters.isDisplayed, 20000, 10)
    });
    it('call one on one test', async function () {
        //await driver.waitForElementById(PACKAGE_NAME + ':id/chat_list_container', asserters.isDisplayed, 20000, 10)
        await driver.waitForElementById(PACKAGE_NAME + ':id/rv_chat_list', asserters.isDisplayed, 20000, 10)
        //Swipe Left
        await swipeLeft(driver, wd, '//androidx.recyclerview.widget.RecyclerView[1]/android.widget.LinearLayout')
        // //Waiting list message on show
        await driver.waitForElementById(PACKAGE_NAME + ':id/rv_dm_list', asserters.isDisplayed, 20000, 10)
        //Click first list message
        await driver.elementByXPath('//androidx.recyclerview.widget.RecyclerView[1]/android.widget.LinearLayout')
            .click()
        //click button call
        await driver.waitForElementById(PACKAGE_NAME + ':id/action_bar_call')
            .click()
        await driver.waitForElementByXPath('//android.view.ViewGroup/android.widget.TextView[2]', asserters.isDisplayed, 20000, 10)
        await driver.elementByXPath('//android.view.ViewGroup/android.view.ViewGroup[5]')
            .click()
    })

});
