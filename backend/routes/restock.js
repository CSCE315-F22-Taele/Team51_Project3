const { Router } = require('express');
const controller = require('../controllers/restockController');


const router = Router();
router.patch("/:itemAmount",controller.showItemsRestock)


module.exports = router;