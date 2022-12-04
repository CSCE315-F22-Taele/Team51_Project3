const { Router } = require('express');
const controller = require('../controllers/google_translate_Controller');

const router = Router();

router.get("/pospage/:text/:targetLanguage", controller.translateFunction );
module.exports = router;