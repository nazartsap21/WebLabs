const express = require('express');
const cartControllers = require("../controllers/cartControllers");
const router = express.Router();

router.route('/').post(cartControllers.create);
router.route('/:userId').get(cartControllers.getAll);
router.route('/:id').post(cartControllers.getById);
router.route('/:id').put(cartControllers.update);
router.route('/:id').delete(cartControllers.remove);
router.route('/').delete(cartControllers.removeAll);

module.exports = router;