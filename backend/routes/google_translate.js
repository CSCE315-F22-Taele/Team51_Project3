const { Router } = require('express');
const { translateFunction } = require('../controllers/google_translate_Controller');

const router = Router();

router.get("/pospage", translateFunction );
module.exports = router;