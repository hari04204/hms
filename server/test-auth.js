const axios = require('axios');

const testAuth = async () => {
  try {
    // Test registration
    const registerResponse = await axios.post('http://localhost:3001/api/auth/register', {
      email: 'test@example.com',
      password: 'test123',
      firstName: 'Test',
      lastName: 'User',
      role: 'patient'
    });

    console.log('Registration successful:', registerResponse.data);

    // Test login
    const loginResponse = await axios.post('http://localhost:3001/api/auth/login', {
      email: 'test@example.com',
      password: 'test123'
    });

    console.log('Login successful:', loginResponse.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
};

testAuth(); 