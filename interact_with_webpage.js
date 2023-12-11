const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');
const { getUrlsFromCommentsArray, getInitialScriptFromHtmlFile } = require("./utils/functions");
const { url } = require('inspector');

const directoryPath = './examples';

const getUrlsForCheckingFromFiles = async (directoryPath) => {
    let urls = []
    try {
        const files = await fs.readdir(directoryPath);
        const htmlFiles = files.filter(file => path.extname(file).toLowerCase() === '.html');
        await Promise.all(htmlFiles.map(async (htmlFile) => {
            try {
                const filePath = path.join(__dirname, 'examples', htmlFile);

                const [inputUrl, expectedOutputUrl] = await getUrlsFromCommentsArray(filePath);

                let paramsString = inputUrl.split('?')[1];
                const paramsObject = new URLSearchParams(paramsString);

                const initialScript = await getInitialScriptFromHtmlFile(filePath);

                const url = await `https://check-smartscript-page.glitch.me?${new URLSearchParams({
                    initialScript: encodeURIComponent(initialScript),
                    expectedOutputUrl: encodeURIComponent(expectedOutputUrl),
                }) + "&" + paramsObject}`;

                if (url) {
                    urls.push(url)
                }
            } catch (error) {
                console.log(`Error ${htmlFile}: ${error} `);
            }
        }));
    } catch (error) {
        console.error('Error reading directory:', error);
    }
    return urls
}

(async () => {
    const urls = await getUrlsForCheckingFromFiles(directoryPath)
})()


const checkResultForURL = async (url, browser) => {
    const page = await browser.newPage();

    await page.goto(url);
    const result = await page.$eval('#smartscript-result', (element) => element.textContent);
    return result
}

// (async () => {
//     const browser = await puppeteer.launch({ headless: "new" });

//     const page = await browser.newPage();


//     await page.goto(url);

//     await page.waitForTimeout(2000); // Adjust the timeout as needed

//     const result = await page.$eval('#result', (element) => element.textContent);

//     console.log('Result:', result);

//     await browser.close();
//     if (result !== 'Match') {
//         console.error('Error: Results do not match.');
//         process.exit(1);
//     }
// })();
