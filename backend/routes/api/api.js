const router = require('express').Router();
const expressAsyncHandler = require('express-async-handler');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const {Song, Playlist, Comment} = require('../../db/models')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.get('/songs', expressAsyncHandler( async (req, res) => {
  const { token } = req.cookies;
  let allSongs = await Song.findAll();
  console.log(req.cookies);
  res.json(allSongs);
}));
router.post('/songs', expressAsyncHandler( async (req, res) => {
  const {

  } = req.body;
}))
router.get('/songs/:songId')
router.put('/songs/:songId')
router.delete('/songs/:songId')
// router.get('/users')
router.get('/playlists')
router.get('/playlists/:playlistId')
router.get('/comments/:commentId')
router.get('/songs/:songId/comments')

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
