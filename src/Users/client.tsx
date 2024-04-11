import axios from "axios";
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const USERS_API = `${BASE_API}/api/users`;
export interface User { _id: number; username: string; password: string; role: string;
firstName: string, lastName: string };

export const signin = async (credentials: User) => {
  const response = await axios.post( `${USERS_API}/signin`, credentials );
  return response.data;
};
export const profile = async () => {
    const response = await axios.post(`${USERS_API}/profile`);
    return response.data;
  };
export const updateUser = async (user: any) => {
  const response = await axios.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

export const findAllUsers = async () => {
    const response = await axios.get(`${USERS_API}`);
    return response.data;
  };
  
  