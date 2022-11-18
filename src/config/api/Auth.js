const getUserToken = () => {
  if (typeof window !== "undefined") {
      return localStorage.getItem('LAKIK_TOKEN');
  }
  return "";
}

const setUserToken = (token) => {
  if (typeof window !== "undefined") {
      localStorage.setItem('LAKIK_TOKEN', token);
  }
}

const deleteUserToken = () => {
  if (typeof window !== "undefined") {
      localStorage.removeItem('LAKIK_TOKEN');
  }
}

export { getUserToken, setUserToken, deleteUserToken }