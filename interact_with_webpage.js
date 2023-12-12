const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');
const { getUrlsFromCommentsArray, getInitialScriptFromHtmlFile } = require("./utils/functions");

const directoryPath = './examples';

const getUrlsForCheckingFromFiles = async (directoryPath) => {

    try {
        const files = await fs.readdir(directoryPath);
        const htmlFiles = files.filter(file => path.extname(file).toLowerCase() === '.html');

        const browser = await puppeteer.launch({ headless: "new" });

        await Promise.all(htmlFiles.map(async (htmlFile) => {
            try {
                const filePath = path.join(__dirname, 'examples', htmlFile);

                const [inputUrl, expectedOutputUrl] = await getUrlsFromCommentsArray(filePath);

                let paramsString = inputUrl.split('?')[1];
                const paramsObject = new URLSearchParams(paramsString);

                const initialScript = await getInitialScriptFromHtmlFile(filePath);

                const url = `http://127.0.0.1:5500?${new URLSearchParams({
                    initialScript: encodeURIComponent(initialScript),
                    expectedOutputUrl: encodeURIComponent(expectedOutputUrl),
                }) + "&" + paramsObject}`;

                if (url) {
                    await checkResultForURL(htmlFile, url, browser)
                }
            } catch (error) {
                console.log(`Error ${htmlFile}: ${error} `);
            }
        }));

        browser.close()
    } catch (error) {
        console.error('Error reading directory:', error);
    }
}

(async () => {
    const urls = await getUrlsForCheckingFromFiles(directoryPath);

})()


const checkResultForURL = async (htmlFile, url, browser) => {
    try {
        const page = await browser.newPage();

        await page.goto(url, {
            waitUntil: "networkidle2",
        })

        const result = await page.evaluate(() => document.getElementById("smartscript-result").textContent);
        if (result == "false") {
            console.log("result: " + result);

            console.log("htmlFile: " + htmlFile);
            console.log("url: " + url);
            console.log("************************************");
        }

    } catch (error) {
        console.error("Error: " + error);
    }
}