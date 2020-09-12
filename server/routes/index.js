const router = require('express').Router();
const controller = require('../controllers/index');
const { updateAccessToken } = require('../utils/middleware');

router.use(updateAccessToken);

router.get('/search/:q', controller.searchArtist);
router.get('/tracks/:id', controller.getTracksByArtist);

module.exports = router;
