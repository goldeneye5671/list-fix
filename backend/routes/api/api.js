const router = require('express').Router();
const expressAsyncHandler = require('express-async-handler');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
// const {User, Song, Playlist, Comment, Album} = require('../../db/models');
const { sequelize } = require('../../db/models');
const { restoreUser } = require('../../utils/auth.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);


router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
