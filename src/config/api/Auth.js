import axios from "axios";
import BASE_URL from "./Constant";

//
const getUserAccessToken = () => {
  if (typeof window !== "undefined") {
      return localStorage.getItem('LAKIK_ACCESS_TOKEN');
  }
  return "";
}

const setUserAccessToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem('LAKIK_ACCESS_TOKEN', token)
  }
}

const setTokenExpiration = () => {
  localStorage.setItem('LAKIK_TOKEN_EXPIRATION', Date.now() + 30000)
}

const getTokenExpiration = () => {
  localStorage.getItem('LAKIK_TOKEN_EXPIRATION')
}

const createNewUserAccessToken = () => {
  axios.get(`${BASE_URL}/v1/token/refresh`, {
    headers: {
      Authorization: `Bearer ${getUserRefreshToken()}`
    }
  }).then((response) => {
    if (typeof window !== "undefined") {
      localStorage.setItem('LAKIK_ACCESS_TOKEN', response.data.result)
    }
  })
}

const deleteUserAccessToken = () => {
  if (typeof window !== "undefined") {
      localStorage.removeItem('LAKIK_ACCESS_TOKEN');
  }
}

//
const getUserRefreshToken = () => {
  if (typeof window !== "undefined") {
      return localStorage.getItem('LAKIK_REFRESH_TOKEN');
  }
  return "";
}

const setUserRefreshToken = (token) => {
  if (typeof window !== "undefined") {
      localStorage.setItem('LAKIK_REFRESH_TOKEN', token);
  }
}

const deleteUserRefreshToken = () => {
  if (typeof window !== "undefined") {
      localStorage.removeItem('LAKIK_REFRESH_TOKEN');
      localStorage.removeItem('LAKIK_ACCESS_TOKEN');
  }
}

export {
  getUserAccessToken, setUserAccessToken, deleteUserAccessToken, createNewUserAccessToken,
  getUserRefreshToken, setUserRefreshToken, deleteUserRefreshToken, setTokenExpiration,
  getTokenExpiration
}