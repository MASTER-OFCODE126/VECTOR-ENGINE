import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/auth/`,
    withCredentials:true
})
 
// Register function
export async function registerUser({ username, email, password }) {
    try {
        const response = await api.post('/register', {
            username, email, password
        });
        return response.data;
    } catch (error) {
        console.log('Error registering user:', error);
    }

}

// Login function
export async function loginUser({email,password})
{
    try {
        const response = await api.post('/login',{
            email,password
        });
        return response.data;
    } catch (error) {
        console.log("Error logging in user:",error);
    }
}

// Get current user function
export async function getCurrentUser()
{
    try {
        const res = await api.get('/get-me');
        return res.data;
    } catch (error) {
        console.log("Error fetching user",error)        
    }
}

// Logout function
export async function logoutUser()
{
    try {
        const res = await api.get('/logout');
        return res.data;
    } catch (error) {
        console.log("Error logging out user:",error);
    }
}

