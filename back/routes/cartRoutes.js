const express = require('express');
const cartControllers = require("../controllers/cartControllers");
const router = express.Router();

router.route('/').post(cartControllers.create);
router.route('/').get(cartControllers.getAll);
router.route('/:id').get(cartControllers.getById);
router.route('/:id').put(cartControllers.update);
router.route('/:id').delete(cartControllers.remove);

module.exports = router;