import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true
  });
  

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signUp = (data) => api.post('/users/register', {
    name: data.name,
    email: data.email,
    password: data.password
  });  
export const login = (data) => api.post('/users/login', data);     
export const getPosts = (authorId) => 
    api.get(authorId ? `/posts/posts/author?authorId=${authorId}` : '/posts/posts');
export const createPost = (data) => api.post('/posts/post', data);
export const updatePost = (id, data) => api.put(`/posts/post/${id}`, data);
export const deletePost = (id) => api.delete(`/posts/post/${id}`);