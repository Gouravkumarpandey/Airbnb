import axios from 'axios';

const API = axios.create({
 baseURL: "http://localhost:8000/api",
});

export const UserSignUp = async (data) => await API.post("/user/signup", data);
export const UserSignIn = async (data) => await API.post("/user/signup", data);

export const getAllProperties = async (filter) =>
     await API.get(`/property/get?${filter}`);
export const getPropertyDetails = async (id) =>
    await API.get(`/property/${id}`);

export const  getFavourites = async (token, data) =>
     await  API.get(`/user/getFavorites`, data,{
    headers: {
            Authorization: `Bearer ${token}`,
        },
});

export const  addToFavourites = async (token, data) => 
    await  API.get(`/user/addToFavorites`, data,{
    headers: {
            Authorization: `Bearer ${token}`,
        },
});

export const  deleteFromFavourites = async (token, data) => 
    await  API.get(`/user/removeFavorites`, data,{
    headers: {
            Authorization: `Bearer ${token}`,
        },
});

export const  BookProperty = async (token, data) =>
     await  API.get(`/user/booking`, data,{
    headers: {
            Authorization: `Bearer ${token}`,
        },
});

export const  getBookProperty = async (token, data) =>
     await  API.get(`/user/getBooking`, data,{
    headers: {
            Authorization: `Bearer ${token}`,
        },
});
