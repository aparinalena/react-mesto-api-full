const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const { cardValidation, cardIdValidation, cardLikeValidation } = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', cardValidation, createCard);
router.delete('/:id', cardIdValidation, deleteCard);
router.put('/:cardId/likes', cardLikeValidation, likeCard);
router.delete('/:cardId/likes', cardLikeValidation, dislikeCard);

module.exports = router;
