const router = require('express').Router();
const { getAllUsersCtrl, getUserProfileCtrl } = require('../controllers/usersController');
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const {validateObjectId} = require('../middlewares/validateObjectId');

// - in app -/in called in Route File

// api/users/profile
router.route('/profile').get(verifyTokenAndAdmin ,getAllUsersCtrl);

// api/users/profile/:id
router.route('/profile/:id').get(validateObjectId,getUserProfileCtrl);


module.exports = router;