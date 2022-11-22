const { Router } = require('express');
const controller = require("../controllers/menuManagerController")



const router = Router();

router.get("/", controller.getMenuItems);
// router.post("/:category/:name/:price/:ingredients/:png/:options/:id", controller.addMenuItem);
router.post("/", controller.addMenuItem);
router.delete("/", controller.removeMenuItem);


module.exports = router;