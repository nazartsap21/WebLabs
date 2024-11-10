let reminderControllers = require('../controllers/reminderControllers');
const express = require('express');
const router = express.Router();

router.route('/').post(reminderControllers.create);
router.route('/').get(reminderControllers.get);
router.route('/:id').get(reminderControllers.getById);
router.route('/:id').put(reminderControllers.update);
router.route('/:id').delete(reminderControllers.deleteById);
router.route('/count-price').post(reminderControllers.countPrice);



module.exports = router;
