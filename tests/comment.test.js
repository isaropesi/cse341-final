const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

afterAll(async () => {
    await mongoose.connection.close();
});

describe('GET /comments/task/:taskId', () => {
    it('should return comments for a task', async () => {
        // Generate valid ObjectId
        const fakeTaskId = new mongoose.Types.ObjectId();
        const res = await request(app).get(`/comments/task/${fakeTaskId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
    });
});
