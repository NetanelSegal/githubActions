const fs = require('fs').promises;


const get3CommentLinesFromHtmlFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return data.split('\n').slice(0, 3);
    } catch (error) {
        console.error('Error reading file:', error);
        return;
    }
}

exports.getUrlsFromCommentsArray = async (filePath) => {
    try {
        const commentsArr = await get3CommentLinesFromHtmlFile(filePath)
        const stringWithUrls = commentsArr.join(', ');
        const urlRegex = /(https?:\/\/[^\s]+)/g;

        const urls = stringWithUrls.match(urlRegex);
        if (!urls) {
            // console.error(`No urls commented in file: ${filePath}`);
            throw `No urls commented in file`
            return;
        }

        return urls;
    } catch (error) {
        throw error;
        console.error(error);
        return;
    }
}

exports.getInitialScriptFromHtmlFile = async (filePath) => {
    try {
        const htmlContent = await fs.readFile(filePath, 'utf-8');
        // Using a regular expression to match the content of the textarea
        const match = htmlContent.match(/<textarea id="input_code_for_run"[\s\S]*?>([\s\S]*?)<\/textarea>/);

        if (match && match[1]) {
            const scriptContent = match[1].trim(); // Trim to remove leading/trailing whitespaces
            return scriptContent;
        } else {
            // console.error(`Textarea not found in the HTML file: ${filePath}`);
            throw `Textarea not found in the HTML file`;
            // return null;
        }
    } catch (error) {
        throw error;
        // console.error(`Error reading HTML file:`, error);
        // return null;
    }
};