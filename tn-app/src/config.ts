export const API_BASE_URL = process.env.REACT_APP_PRODUCTION ? process.env.REACT_APP_API_BASE_URL : "http://127.0.0.1:5000";
export const API_VERSION = process.env.REACT_APP_PRODUCTION ? process.env.REACT_APP_API_VERSION : "/v1";

console.log("REACT_APP_PRODUCTION", process.env.REACT_APP_PRODUCTION);
console.log("API_BASE_URL", API_BASE_URL);
console.log("REACT_APP_API_BASE_URL", process.env.REACT_APP_API_BASE_URL);