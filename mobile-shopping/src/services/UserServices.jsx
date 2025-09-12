import axios from "../config/Axios-config";

//Login API
const handleLogin = async (username, password) => {
    return await axios.post("/auth/login", {
        username,
        password,    
    });
}

const getUserProfile = async (token) => {
    const res = await axios.get("/auth/profile", {
        headers: { Authorization: `Bearer ${token}`,
        },
    });
    return res;
};

export { handleLogin, getUserProfile };