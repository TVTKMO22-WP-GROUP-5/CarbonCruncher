const LOCAL_API = false
const API_BASE_URL = LOCAL_API
  ? "https://localhost:5001/api"
  : "https://carbon-cruncher.azurewebsites.net/api"
export const LOGIN_URL = `${API_BASE_URL}/user/login`
export const REGISTER_URL = `${API_BASE_URL}/user/register`
export const GET_VISU4_URL = `${API_BASE_URL}/visu4/co2country`
