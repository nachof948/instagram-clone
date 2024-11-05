import axios from "axios";
import { IFormData } from "../types";

const API = axios.create({
    baseURL: 'http://localhost:4500',
    withCredentials: true
})

/* AUTH */
export const signup = (formData:IFormData) => API.post('/register', formData);
export const login = (formData:IFormData) => API.post('/login', formData);
export const logout = () => API.post('/logout')

/* POST */
export const addPost = (formData: any) => API.post('/post/addpost', formData);
export const getAllPost = () => API.get('/post/all');
export const deletePost = (postId: string) => API.delete(`/post/delete/${postId}`);