const router = require('express').Router();
const expressAsyncHandler = require('express-async-handler');
const { Comment } = require('../../db/models');
const { sequelize } = require("../../db/models");


router.get('/songs/:songId', expressAsyncHandler(async (req, res) => {
    const comments = await Comment.findAll(
        {
            where:{
                songId: req.params.songId
            }
        }
    );
    if (comments) {
        res.json(comments);
    }else{
        throw new Error("Song may not exist");
    }
}));

router.get('/comments/users/:userId');

router.get('/:commentId', expressAsyncHandler(async (req, res) => {
    const comment = await Comment.findByPk(req.params.commentId);
    if (comment){
        res.json(comment);
    }else {
        throw new Error ("Comment not found")
    }
}));

router.post('/', expressAsyncHandler(async (req, res) => {
    const {
        userId,
        songId,
        title,
        body
    } = req.body;
    const newComment = await Comment.create({
        userId,
        songId,
        title,
        body
    })
    if (newComment) {
        res.json(newComment);
    } else {
        throw new Error("Comment creation failure")
    }
}));

router.put('/:commentId', expressAsyncHandler(async (req, res) => {
    const {
        title,
        body
    } = req.body;

    const comment = await Comment.findByPk(req.params.commentId);
    if (comment) {
        await comment.update({
                title,
                body
            }
        )
        res.json(comment);
    } else{
        throw new Error ("Comment may not exist")
    }
}));

router.delete('/:commentId', expressAsyncHandler(async (req, res) => {
    const {songId, id} = req.body
    console.log(songId);
    const commentToDelete = await Comment.findByPk(id);
    if (commentToDelete) {
        commentToDelete.destroy();
        return res.json({
            id,
            songId
        })
    }
}));

// router.get('/songs/:songId/comments')

module.exports = router;
