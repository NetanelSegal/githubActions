const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    // Define the URL with parameters
    const url = "https://check-smartscript-page.glitch.me/?num1=13&num2=13"; // Replace with your actual URL and parameters

    // Navigate to the web page with parameters
    await page.goto(url);

    // Wait for a moment to ensure the page has loaded
    await page.waitForTimeout(2000); // Adjust the timeout as needed

    // Extract the result from the web page
    const result = await page.$eval('#result', (element) => element.textContent);

    console.log('Result:', result);

    // Close the browser
    await browser.close();

    // Exit with an error if the result is not as expected
    if (result !== 'Match') {
        console.error('Error: Results do not match.');
        process.exit(1);
    }
})();
