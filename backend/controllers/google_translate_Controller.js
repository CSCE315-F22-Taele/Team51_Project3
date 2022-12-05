const {Translate} = require('@google-cloud/translate').v2;
require('dotenv').config();

const CREDENTIALS = JSON.parse(process.env.GOOGLE_SERVICE_KEY);

const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id
});

const translateFunction = async (req, res) => {
    // Grabs the :id value (params) from the request
    const { text } = req.params.text;
    const { targetLanguage } = req.params.targetLanguage;
    console.log('hello')
    try {
        let [res] = await translate.translate(req.params.text, req.params.targetLanguage);
        return res;
    } catch (error) {
        console.log(`Error at translateText --> ${error}`);
        return 0;
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