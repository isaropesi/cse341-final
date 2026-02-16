const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Project = require('../models/Project');

// Disconnect from database after tests
afterAll(async () => {
    await mongoose.connection.close();
});

describe('GET /projects', () => {
    it('should return all projects', async () => {
        const res = await request(app).get('/projects');
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
    });
});

describe('GET /projects/:id', () => {
    it('should return a 404 for a non-existent project', async () => {
        const fakeId = new mongoose.Types.ObjectId(); // Generate a valid ObjectId that doesn't exist
        const res = await request(app).get(`/projects/${fakeId}`);
        expect(res.statusCode).toBe(404);
    });

    // We can't guarantee a valid ID exists without creating one first,
    // but for a simple unit test suite this demonstrates the concept.
    // Ideally we'd use a mock DB or create a doc in `beforeAll`.
});
