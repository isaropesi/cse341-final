const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

afterAll(async () => {
    await mongoose.connection.close();
});

describe('GET /users', () => {
    it('should return all users', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        // Should be an array
        expect(Array.isArray(res.body.data)).toBe(true);
    });
});

describe('GET /users/:id', () => {
    it('should return a 404 for a non-existent user', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const res = await request(app).get(`/users/${fakeId}`);
        expect(res.statusCode).toBe(404);
    });
});
