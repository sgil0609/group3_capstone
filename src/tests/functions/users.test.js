const request = require('supertest');
const app = require('/src/server/main.js'); 

describe('GET /users', () => {
    it('should return a list of users with status 200', async () => {
        const response = await request(app).get('/users');
        expect(response.status).toBe(200);
        expect(response.body.users).toBeDefined();
        
    });
});

describe('PUT /users/:id', () => {
    it('should update user data and return the updated user', async () => {
        const userId = 'some-user-id'; // Replace with an actual user ID
        const updatedData = { name: 'Updated Name' }; // Replace with your desired data

        const response = await request(app)
            .put(`/users/${userId}`)
            .send(updatedData);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(updatedData.name);
        // Add more assertions as needed
    });
});


describe('DELETE /users/:id', () => {
    it('should delete a user and return a success message', async () => {
        const userId = 'some-user-id'; // Replace with an actual user ID

        const response = await request(app).delete(`/users/${userId}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User deleted successfully');
        // Add more assertions as needed
    });
});
