const BASE_URL = "http://localhost:3000/api/";
export const environment = {
  production: true,
  BASE_URL:BASE_URL,
  URL_REGISTER: BASE_URL+"users",
  URL_LOGIN: BASE_URL+"login",
  REGIS_SUCCESS:"Regitration Done Succesfully",
  LOGIN_SUCCESS:"Login Succesfully",
  TOKEN_STORAGE_KEY:"token_storage_key",
  MSG_REC_ADD:"Course Added Succesfully",
  MSG_REC_EMP:"Course Title and Code cannot be empty",
  MSG_REG_PAS_EMP:"Password and Confirm Password should be match."
};
