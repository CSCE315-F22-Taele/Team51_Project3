const { Translate } = require("@google-cloud/translate").v2;
require("dotenv").config();

const CREDENTIALS = JSON.parse(process.env.GOOGLE_SERVICE_KEY);

const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id,
});

const translateFunction = async (req, res) => {
    const { targetLanguage } = req.params;
    const { text } = req.body;
    try {
        const result = await translate.translate(text, targetLanguage);
        res.status(201).json(result);
    } catch (error) {
        console.log("[ERROR] ", error);
    }
};

// translateText('Oggi è lunedì', 'en')
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });
module.exports = {
    translateFunction,
};
