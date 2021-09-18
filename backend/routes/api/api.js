const router = require('express').Router();
const expressAsyncHandler = require('express-async-handler');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const songsRouter = require('./songs');
const commentsRouter = require('./comments')
const { sequelize } = require('../../db/models');
const { restoreUser } = require('../../utils/auth.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/songs', songsRouter);
router.use('/comments', commentsRouter)


router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
