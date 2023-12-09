const fs = require('fs').promises;


const get3CommentLinesFromHtmlFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const linesToExtract = data.split('\n').slice(0, 3);

        return linesToExtract;
    } catch (error) {
        console.error('Error reading file:', error);
        throw error; // Re-throw the
    }
}



const getUrlsFromComments = (commentsArr) => {
    console.log(commentsArr);
}


exports.getUrlsFromFile = async (filePath) => {
    try {
        const commentsArr = await get3CommentLinesFromHtmlFile(filePath)
        console.log(commentsArr);
    } catch (error) {
        console.log(error);
    }
}