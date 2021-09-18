const router = require('express').Router();
const expressAsyncHandler = require('express-async-handler');
const { User, Song } = require('../../db/models');
const { sequelize } = require("../../db/models");

router.get('/', expressAsyncHandler( async (req, res) => {
    if (!req.query.limit) {
      let allSongs = await Song.findAll();
      res.json(allSongs);
    }else{
      let allSongsLimited = await Song.findAll({
        limit: parseInt(req.query.limit),
        order: sequelize.random(),
      })
      res.json(allSongsLimited)
    }
  }));
  

  router.post('/', expressAsyncHandler( async (req, res) => {
    console.log("Data recieved")
    const {
      userId,
      title,
      songUrl,
    } = req.body;

    const newSong = await Song.create({
      userId,
      title,
      songUrl,
    });

    if (newSong) {
      res.json(newSong);
      console.log("Created successfully");
    } else {
      throw new Error("Song creation failure");
    }
  }))
  

  router.get('/:songId', expressAsyncHandler( async (req, res) => {
    const song = await Song.findByPk(req.params.songId);
    res.json(song);
  }));


  router.put('/:songId', expressAsyncHandler(async (req, res) => {
    const {
      userId,
      songId,
      title,
      songUrl
    } = req.body
  
    const song = await Song.findByPk(req.params.songId);
    if (song){
      song.update(
        {
          userId,
          title,
          songUrl
        })
        res.json(song);
    } else {
      throw new Error ("Song not found")
    }
  }))

  router.delete('/:songId', expressAsyncHandler( async (req, res) => {
    const songToDelete = await Song.findByPk(req.params.songId);
    if (songToDelete){
      songToDelete.destroy();
      return res.json({
        songId: req.params.songId
      });
    } else {
      throw new Error ("Song requested for deletion not found")
    }
  } ));

  module.exports = router;
