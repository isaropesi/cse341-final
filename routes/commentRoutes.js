const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const commentController = require('../controllers/commentController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - text
 *         - taskId
 *       properties:
 *         text:
 *           type: string
 *           description: The comment content
 *         taskId:
 *           type: string
 *           description: The ID of the task being commented on
 *         authorId:
 *           type: string
 *           description: The ID of the user author (auto-filled)
 */

/**
 * @swagger
 * /comments/task/{taskId}:
 *   get:
 *     summary: Get comments for a task
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of comments
 */
router.get('/task/:taskId', commentController.getCommentsByTask);

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Add a comment (Login Required)
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               taskId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created
 *       401:
 *         description: Unauthorized
 */
router.post('/', ensureAuth, commentController.addComment);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment (Login Required)
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment deleted
 *       403:
 *         description: Not authorized
 */
router.delete('/:id', ensureAuth, commentController.deleteComment);

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Update a comment (Login Required)
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated
 *       403:
 *         description: Not authorized
 */
router.put('/:id', ensureAuth, commentController.updateComment);


module.exports = router;
