const router = require('express').Router();
const expressAsyncHandler = require('express-async-handler');
const { User, Comment } = require('../../db/models');
const { sequelize } = require("../../db/models");


router.get('/comments/:commentId')
router.get('/songs/:songId/comments')
