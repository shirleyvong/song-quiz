const router = require('express').Router();
const controller = require('../controllers/index');
const { updateAccessToken } = require('../utils/middleware');

router.use(updateAccessToken);

router.get('/search/:q', controller.searchArtist);
router.get('/tracks/:id', controller.getTracksByArtist);
router.post('/recentlyPlayed', controller.addRecentlyPlayed);
router.get('/recentlyPlayed', controller.getRecentlyPlayed);

module.exports = router;
