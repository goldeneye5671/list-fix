const express = require('express')
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const asyncHandler = require('express-async-handler');
const {User, Song, Album, Playlist} = require('../../db/models')
const {setTokenCookie} = require('../../utils/auth');

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
  ];

  router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
      const { email, password, username } = req.body;
      const user = await User.signup({ email, username, password });
  
      await setTokenCookie(res, user);
  
      return res.json({
        user,
      });
    }),
  );

  router.get('/:id', asyncHandler( async (req, res) => {
    const user = await User.getCurrentUserById(req.params.id);
    res.json({
      user,
    })
  }))

  router.get('/:id/songs', asyncHandler(async(req,res) => {
    const songs = await Song.findAll({
      where: {
        userId: req.params.id
      }
    });
    res.json({
      songs
    });
  }));

  router.get('/:id/albums', asyncHandler(async(req, res) => {
    const albums = await Album.findAll({
      where: {
        userId: req.params.id
      }
    });
    res.json({
      albums
    })
  }));

  router.get('/:id/playlists', asyncHandler(async(req,res)=>{
    const playlists = await Playlist.findAll({
      where: {
        userId: req.params.id
      }
    });
    res.json({
      playlists
    })
  }))
  router.put('/')

module.exports = router;
