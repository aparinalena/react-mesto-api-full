const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const { cardValidation, cardIdValidation } = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', cardValidation, createCard);
router.delete('/:_id', cardIdValidation, deleteCard);
router.put('/:_cardId/likes', cardIdValidation, likeCard);
router.delete('/:_cardId/likes', cardIdValidation, dislikeCard);

module.exports = router;
