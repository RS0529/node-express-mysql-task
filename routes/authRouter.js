
const userController = require("../controllers/userController");
const router = require("express").Router();


router.post("/register", userController.createUser);

router.post("/login", userController.userLogin);


module.exports = router;