const express = require('express');
const router = express.Router();
const utilities = require('../utilities/index');

const userController = require('../controllers/users');
const {isAuthenticated} = require('../middleware/auth');
const { userValidationRules, validateUser }= require('../validation/users');

router.get('/', utilities.handleErrors(userController.getAll));
router.get('/:id', utilities.handleErrors(userController.getSingle));

router.post('/', isAuthenticated, userValidationRules, validateUser, utilities.handleErrors(userController.createUser));

router.put('/:id', isAuthenticated, userValidationRules, validateUser, utilities.handleErrors(userController.updateUser));

router.delete('/:id', isAuthenticated, utilities.handleErrors(userController.deleteUser));

module.exports = router;