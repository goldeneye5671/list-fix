const router = require('express').Router();
const expressAsyncHandler = require('express-async-handler');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const {Song, Playlist, Comment, Album} = require('../../db/models');
const { sequelize } = require('../../db/models');
const { restoreUser } = require('../../utils/auth.js');
const url = require("url")

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.get('/songs', expressAsyncHandler( async (req, res) => {
  if (!req.query.limit) {
    let allSongs = await Song.findAll();
    res.json(allSongs);
  }else{
    let allSongsLimited = await Song.findAll({limit: parseInt(req.query.limit), order: sequelize.random()})
    res.json(allSongsLimited)
  }
}));

router.post('/songs', expressAsyncHandler( async (req, res) => {
  console.log("Data recieved")
  const {
    userId,
    title,
    songUrl,
    selectedAlbumId
  } = req.body;
  const newSong = await Song.create({
    userId,
    title,
    songUrl,
    albumId: selectedAlbumId
  });
  if (newSong) {
    res.json(newSong);
  } else {
    throw new Error("Song creation failure");
  }
}))

router.get('/songs/:songId', expressAsyncHandler( async (req, res) => {
  const song = await Song.findByPk(req.params.songId);
  res.json(song);
}));

router.put('/songs/:songId')
router.delete('/songs/:songId')
// router.get('/users')
router.get('/playlists', expressAsyncHandler(async(req,res)=> {
  if (!req.query.limit){
    const playlists = await Playlist.findAll();
    res.json(playlists);
  } else {
    const playlistsLimited = await Playlist.findAll({limit: parseInt(req.query.limit), order: sequelize.random()})
    res.json(playlistsLimited);
  }
}));


router.get('/playlists/:playlistId', expressAsyncHandler(async (req, res) => {
  const playlist = await Playlist.findByPk(req.params.playlistId);
  res.json(playlist)
}));

router.post('/playlists', expressAsyncHandler(async (req, res) => {
  const {
    name,
    userId
  } = req.body;
  const newPlaylist = await Playlist.create({userId, name});
  if (newPlaylist) {
    res.json(newPlaylist);
  } else{
    throw new Error("Playlist creation error")
  }
}))

router.get('/comments/:commentId')
router.get('/songs/:songId/comments')

router.get('/albums', expressAsyncHandler(async(req, res) => {
  if (!req.query.limit){
    const albums = await Album.findAll();
    res.json(albums);
  }else {
    const albumsLimited = await Album.findAll({limit: parseInt(req.query.limit), order: sequelize.random()})
    res.json(albumsLimited)
  }
}));

router.get('/albums/:id', expressAsyncHandler(async(req, res) => {
  const album = await Album.findByPk(req.params.id);
  res.json(album);
}));

router.post('/albums', expressAsyncHandler(async(req, res) => {
  console.log("Data recieved")
  const {
    userId,
    title,
    imageUrl,
  } = req.body;
  const newAlbum = await Album.create({
    userId,
    title,
    imageUrl,
  });
  if (newAlbum) {
    res.json(newAlbum);
  } else {
    throw new Error("Album creation failure");
  }
}));

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
