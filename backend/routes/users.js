const router = require('express').Router();
const {
  getUser,
  getUsers,
  getUserData,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

const {
  avatarValidation,
  userDataValidation,
  userIdValidation,
} = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getUserData);
router.get('/:_id', userIdValidation, getUser);
router.patch('/me', userDataValidation, updateUser);
router.patch('/me/avatar', avatarValidation, updateUserAvatar);

module.exports = router;
