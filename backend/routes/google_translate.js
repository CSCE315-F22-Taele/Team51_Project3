const { Router } = require('express');
const controller = require('../controllers/google_translate_Controller');

const router = Router();

router.get("/", controller.translateText('Oggi è lunedì', 'en'))
module.exports = router;