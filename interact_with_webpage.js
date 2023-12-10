const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { getUrlsFromFile } = require("./utils/functions")



  




const directoryPath = './examples';

let htmlFiles = []; 

fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }
  
    // סנן רק קבצים שמסתיימים ב־html
    const htmlFiles = files.filter(file => path.extname(file).toLowerCase() === '.html');
    // console.log(htmlFiles);
    htmlFiles.forEach(htmlFile => {
        
        console.log(htmlFile);

       
    });


    const filePath = `${__dirname}/examples/${htmlFiles[4]}`;
    console.log(filePath);
    const getUrls = async() => {


        const urls = await getUrlsFromFile(filePath);
        console.log(urls);
    }
    getUrls();
  });


// Specify the path to the HTML file

//const filePath = `${__dirname}/examples/${htmlFiles[1]}`;

// const getUrls = async() => {


//     const urls = await getUrlsFromFile(filePath);
//     console.log(urls[0]);
// }


//getUrls();


(async () => {
    // לפתוח את הקובץ html
    // לשלוף משם את הקוד שבתוך ה
    // document.getElementById("input_code_for_run").value
    const browser = await puppeteer.launch({ headless: "new" });

    // const currentHtmlPage = await browser.newPage();

    // await currentHtmlPage.goto(`file://${__dirname}/examples/facebook_clickid.html`);



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
