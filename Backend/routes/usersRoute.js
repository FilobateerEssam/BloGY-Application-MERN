const router = require('express').Router();
const { getAllUsersCtrl } = require('../controllers/usersController');
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken');

// - in app -/in called in Route File
// api/users/profile
router.route('/profile').get(verifyTokenAndAdmin ,getAllUsersCtrl);



module.exports = router;