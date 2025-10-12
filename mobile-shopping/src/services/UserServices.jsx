import axios from "../config/Axios-config";

const handleLogin = async (username, password) => {
  try {
    const res = await axios.post("/auth/login", {
      username,
      password,
      expiresInMins: 30,    
    });
    
    console.log('===== LOGIN RESPONSE (after interceptor) =====');
    console.log('Response:', res);
    console.log('==============================================');
    
    return res; 
  } catch (error) {
    console.error('===== LOGIN ERROR =====');
    console.error('Error:', error);
    console.error('Error Response:', error.response?.data);
    console.error('=======================');
    throw error;
  }
};

const getUserProfile = async (token) => {
  try {
    console.log('===== FETCHING PROFILE =====');
    console.log('Token being sent:', token);

    const res = await axios.get("/auth/me", {
      headers: { 
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Profile Response:', res);
    return res; 
  } catch (error) {
    console.error('Profile Error:', error);
    console.error('===== PROFILE ERROR =====');
    console.error('Error:', error);
    console.error('Error Response:', error.response);
    console.error('Error Status:', error.response?.status);
    console.error('Error Data:', error.response?.data);
    throw error;
  }
};

export { handleLogin, getUserProfile };