/**
 * Created on : 20/05/20
 * Author     : arioki
 * Name       : Yoga Setiawan
 * GitHub     : https://github.com/arioki
 */

exports.swipeLeft = async (driver, wd, element) => {
    let item = await driver.elementByXPath(element);
    const swipeLeft = new wd.TouchAction()
        .press({element: item})
        .moveTo({element: item, x: -900, y: -0})
        .release()
    await driver.performTouchAction(swipeLeft);
}

exports.swipeRight = async (driver, wd, element) => {
    let item = await driver.elementByXPath(element);
    const swipeRight = new wd.TouchAction()
        .press({element: item})
        .moveTo({element: item, x: 900, y: 0})
        .release()
    await driver.performTouchAction(swipeRight);
}
