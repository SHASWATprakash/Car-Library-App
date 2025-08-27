import axios from "axios";

const API = axios.create({
  baseURL: "https://cars-mock-api-new-6e7a623e6570.herokuapp.com/api",
});

export default API;

export const getCars = async () => {
  return API.get('/cars');
};

export const getCarById = async (id: string) => {
  return API.get(`/cars/${id}`);
};

export const createCar = async (carData: any) => {
  return API.post('/cars', carData);
};

export const deleteCar = async (id: string) => {
  return API.delete(`/cars/${id}`);
};

export const getCarTypes = async () => {
  return API.get('/cars/types');
};

export const getCarTags = async () => {
  return API.get('/cars/tags');
};