const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCards,
  putLikes,
  deleteLikes,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCards);

router.put('/cards/:cardId/likes', putLikes); // поставить лайк
router.delete('/cards/:cardId/likes', deleteLikes); // убрать лайк

module.exports = router;
