const { Router } = require('express');
const controller = require("./controller")

const router = Router();

router.get("/", controller.getMenuItems);
router.post("/", controller.addMenuItem);
router.get("/:id", controller.getMenuItemById);
router.delete("/:id", controller.removeMenuItem);


module.exports = router;