import axios from 'axios';

const API_URL = 'http://localhost:4500/api/users';

const register = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data.token;
  } catch (error) {
    throw error.response.data;
  }
};

export { register, login };
