const router = require('express').Router();
const { getAllUsersCtrl, getUserProfileCtrl, UpdateUserProfileCtrl } = require('../controllers/usersController');
const { verifyTokenAndAdmin, verifyTokenOnlyuser } = require('../middlewares/verifyToken');
const {validateObjectId} = require('../middlewares/validateObjectId');

// - in app -/in called in Route File

// api/users/profile
router.route('/profile').get(verifyTokenAndAdmin ,getAllUsersCtrl);

// api/users/profile/:id
router.route('/profile/:id')
.get(validateObjectId,getUserProfileCtrl)
.put(validateObjectId,verifyTokenOnlyuser,UpdateUserProfileCtrl)


module.exports = router;