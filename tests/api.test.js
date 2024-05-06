const axios = require('axios');
const baseUrl = 'https://reqres.in/api'
let userId;

describe('User Test', () => {

    test('GET List of Users', async () => {
        const response = await axios.get(`${baseUrl}/users`);
        expect(response.status).toBe(200);
        const getLengthData = response.data.data.length
        for (let user = 0; user < getLengthData; user++){
            expect(response.data.data[user]).toHaveProperty('id')
        }
        userId = response.data.data[1].id;
    });

    test('GET Single User Data', async () => {
        const response = await axios.get(`${baseUrl}/users/${userId}`);
        expect(response.status).toBe(200);
        expect(response.data.data).toHaveProperty('id')
        expect(response.data.data).toHaveProperty('email')
    });

    test('GET User Not Found', async () => {
        const response = await axios.get(`${baseUrl}/users/23`, {
            validateStatus: function (status) {
                return status === 404;
            }
        });
        expect(response.status).toBe(404);
        expect(response.data).toEqual({})
    });
});

describe('CRUD Test', () => {
    test('POST Create User', async () => {
        const data = { name: "morpheus", job: "leader" };
        try {
            const response = await axios.post(`${baseUrl}/users`, data);
            expect(response.status).toBe(201);
            expect(response.data.name).toBe('morpheus')
            expect(response.data.job).toBe('leader')
            expect(response.data).toHaveProperty('id')
            userId = response.data.id
        } catch (error) {
            console.error(error);
        }
    });

    test('PUT Update User', async () => {
        const data = { name: "Mark", job: "Zucc" };
        try {
            const response = await axios.put(`${baseUrl}/users/${userId}`, data);
            expect(response.status).toBe(200);
            expect(response.data.name).toBe('Mark')
            expect(response.data.job).toBe('Zucc')
        } catch (error) {
            console.error(error);
        }
    });

    test('PATCH Update User', async () => {
        const data = { name: "Mark", job: "Zucc" };
        try {
            const response = await axios.patch(`${baseUrl}/users/${userId}`, data);
            expect(response.status).toBe(200);
            expect(response.data.name).toBe('Mark')
            expect(response.data.job).toBe('Zucc')
        } catch (error) {
            console.error(error);
        }
    });

    test('DELETE User', async () => {
        const data = { name: "Mark", job: "Zucc" };
        try {
            const response = await axios.delete(`${baseUrl}/users/${userId}`, data);
            expect(response.status).toBe(204);
            expect(response.data).toBe('')
        } catch (error) {
            console.error(error);
        }
    });
})

describe('Registration Test', () => {
    test('POST Registration Success Test', async () => {
        const data = { email: "eve.holt@reqres.in", password: "pistol" };
        const response = await axios.post(`${baseUrl}/register`, data)
        expect(response.status).toBe(200)
        expect(response.data).toHaveProperty('id')
        expect(response.data).toHaveProperty('token')
    });

    test('POST Registration Failure Test', async () => {
        const data = { email: "eve.holt@reqres.in"};
        const response = await axios.post(`${baseUrl}/register`, data, {
            validateStatus: function(status){
                return status === 400;
            }
        })
        expect(response.status).toBe(400)
        expect(response.data).toHaveProperty('error')
    });
})

describe('Login Test', () => {
    test('POST Login Success Test', async () => {
        const data = { email: "eve.holt@reqres.in", password: "cityslicka" };
        const response = await axios.post(`${baseUrl}/login`, data);
        expect(response.status).toBe(200)
        expect(response.data).toHaveProperty('token')
    });

    test('POST Login Failure Test', async () => {
        const data = { email: "eve.holt@reqres.in" };
        const response = await axios.post(`${baseUrl}/login`, data, {
            validateStatus: function(status) {
                return status === 400;
            }
        });
        expect(response.status).toBe(400)
        expect(response.data).toHaveProperty('error')
    });
})
