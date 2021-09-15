const router = require('express').Router();
const expressAsyncHandler = require('express-async-handler');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const {Song, Playlist, Comment, Album} = require('../../db/models')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.get('/songs', expressAsyncHandler( async (req, res) => {
  const { token } = req.cookies;
  let allSongs = await Song.findAll();
  console.log(req.cookies);
  res.json(allSongs);
}));

router.post('/songs', expressAsyncHandler( async (req, res) => {
  console.log("Data recieved")
  const {
    userId,
    title,
    songUrl,
    selectedAlbumId
  } = req.body;
  console.log(title);
}))

router.get('/songs/:songId', expressAsyncHandler( async (req, res) => {
  const song = await Song.findByPk(req.params.songId);
  res.json(song);
}));

router.put('/songs/:songId')
router.delete('/songs/:songId')
// router.get('/users')
router.get('/playlists')
router.get('/playlists/:playlistId')
router.get('/comments/:commentId')
router.get('/songs/:songId/comments')

router.get('/albums', expressAsyncHandler(async(req, res) => {
  const albums = await Album.findAll();
  res.json(albums);
}));

router.get('/albums/:id', expressAsyncHandler(async(req, res) => {
  const album = await Album.findByPk(req.params.id);
  res.json(album);
}));

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
