import axios from "axios";

const baseUrl = "http://localhost:4000/api/v1"

const API = axios.create({
    baseURL: baseUrl,
    withCredentials: true, // Ensure cookies are sent with each request
})


//interceptors
API.interceptors.request.use((req)=> {
    const token = localStorage.getItem("token")
    try {
        
        req.headers.Authorization = `Bearer ${token}`
    } catch (error) {
        console.log(error)
    }
    return req;
})



//user register
export const userRegister = (formData) => API.post("/register",formData)

//user login
export const userLogin = (loginValue) => API.post("/login",loginValue)

//get profile
export const userProfile = () => API.get("/current-user");

//change password 
export const passwordUpdate = (changeValue) => API.put("/change-password", changeValue)

//update profile 
export const updateProfile = (updateForm) => API.put("/update-account", updateForm);
//upadte avatar
export const updateUserAvatar = (updateForm) => API.put("/avatar", updateForm);


//delete profile 
export const deleteProfile = (id) => API.delete(`/delete/${id}`);




export default API;