const LOCAL_API = true
const API_BASE_URL = LOCAL_API ? "https://localhost:5001/api" : "https://carbon-cruncher.azurewebsites.net/api"
export const LOGIN_USER_URL = `${API_BASE_URL}/user/login`
export const REGISTER_USER_URL = `${API_BASE_URL}/user/register`
export const DELETE_USER_URL = `${API_BASE_URL}/user`
export const VISUALIZATION_URL = `${API_BASE_URL}/user/visualization`
export const GET_VISU1_MONTHLY_URL = `${API_BASE_URL}/visu1/monthly`
export const GET_VISU1_ANNUAL_URL = `${API_BASE_URL}/visu1/annual`
export const GET_VISU2_MONTHLY_URL = `${API_BASE_URL}/visu2/monthly`
export const GET_VISU2_ANNUAL_URL = `${API_BASE_URL}/visu2/annual`
export const GET_VISU2_ICECORE_URL = `${API_BASE_URL}/visu2/icecore`
export const GET_VISU3_GLOBAL_URL = `${API_BASE_URL}/visu3/global`
export const GET_VISU3_EVENT_URL = `${API_BASE_URL}/visu3/event`
export const GET_VISU4_URL = `${API_BASE_URL}/visu4/co2country`
export const GET_VISU5_URL = `${API_BASE_URL}/visu5/co2sector`
export const GET_VISU_INFO = `${API_BASE_URL}/visuutils/info`

export const NAME_CLAIM = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
