const axios = require('axios');
const baseUrl = 'https://reqres.in/api'
let userId;

describe('User Test', () => {

    test('GET List of Users', async () => {
        const response = await axios.get(`${baseUrl}/users`);
        expect(response.status).toBe(200);
        userId = response.data.data[1].id;
    });

    test('GET Single User Data', async () => {
        const response = await axios.get(`${baseUrl}/users/${userId}`)
        expect(response.status).toBe(200);
    });

    test('GET User Not Found', async () => {
        const response = await axios.get(`${baseUrl}/users/23`, {
            validateStatus: function (status) {
                return status === 404;
            }
        });
        expect(response.status).toBe(404);
    });
});

describe('CRUD Test', () => {
    test('Create User', async () => {
        const data = { name: "morpheus", job: "leader" };
        try {
            const response = await axios.post(`${baseUrl}/users`, data);
            expect(response.status).toBe(201);
            userId = response.data.id
        } catch (error) {
            console.error(error);
        }
    });
})