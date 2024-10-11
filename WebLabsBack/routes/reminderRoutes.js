let reminderControllers = require('../controllers/reminderControllers');
const express = require('express');
const router = express.Router();

router.route('/create').post(reminderControllers.create);
router.route('/get').get(reminderControllers.get);
router.route('/get/:id').get(reminderControllers.getById);
router.route('/update/:id').put(reminderControllers.update);
router.route('/delete/:id').delete(reminderControllers.deleteById);
router.route('/count-price').post(reminderControllers.countPrice);



module.exports = router;
