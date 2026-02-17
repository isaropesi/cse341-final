const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

// Disconnect from database after tests
afterAll(async () => {
    await mongoose.connection.close();
});

describe('GET /tasks/project/:projectId', () => {
    it('should get tasks for a project', async () => {
        // We assume a project ID (this test might fail on empty db or invalid ID,
        // but demonstrates the structure).
        // In a real test, we'd insert a project first.
        const fakeProjectId = new mongoose.Types.ObjectId();

        // This route would return empty array if project has no tasks, which is 200 OK
        const res = await request(app).get(`/tasks/project/${fakeProjectId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        // Should be an array
        expect(Array.isArray(res.body.data)).toBe(true);
    });
    describe('GET /tasks/:id', () => {
        it('should return a 404 for a non-existent task', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const res = await request(app).get(`/tasks/${fakeId}`);
            expect(res.statusCode).toBe(404);
        });
    });
});

