const router = require('express').Router();
const expressAsyncHandler = require('express-async-handler');
const { User, Song } = require('../../db/models');
const { sequelize } = require("../../db/models");

router.get('/songs', expressAsyncHandler( async (req, res) => {
    if (!req.query.limit) {
      let allSongs = await Song.findAll({
        include: [
          User,
          Album,
        ],
      });
      res.json(allSongs);
    }else{
      let allSongsLimited = await Song.findAll({
        include: [
          User,
          Album,
        ],
        limit: parseInt(req.query.limit),
        order: sequelize.random(),
      })
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
    const song = await Song.findByPk(req.params.songId,
      {include: [Album, User]});
    res.json(song);
  }));


  router.put('/songs/:songId', expressAsyncHandler(async (req, res) => {
    const {
      userId,
      selectedAlbumId,
      songId,
      title,
      songUrl
    } = req.body
  
    const song = await Song.findByPk(req.params.songId, {include: [Album, User]});
    if (song){
      song.update(
        {
          userId,
          selectedAlbumId,
          title,
          songUrl
        })
        res.json(song);
    } else {
      throw new Error ("Song not found")
    }
  }))

  router.delete('/songs/:songId')
