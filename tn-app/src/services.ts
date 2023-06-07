import axios from "axios";
import { API_BASE_URL, API_VERSION } from "./config";

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = token;
    }

    return config;
}, (error) => {
    console.error(error);
    return Promise.reject(error);
});

const urlBase = `${API_BASE_URL}${API_VERSION}`;


const loginApi = (user: { password: string, username: string; }) => {
    return axios.post(`${urlBase}/authenticate`, user);
};

const userBalanceApi = () => {
    return axios.get(`${API_BASE_URL}${API_VERSION}/users/balance`);
};

const deleteRecordApi = (recordId: number) => {
    return axios.delete(`${API_BASE_URL}${API_VERSION}/records/${recordId}`);
};
const getRecordsApi = async (params: {
    pageIndex: number,
    pageSize: number,
    sortField: string,
    sortDirection: string;
}) => {
    const config = {
        params: {
            page: params.pageIndex,
            perPage: params.pageSize,
            sortField: params.sortField,
            sortDirection: params.sortDirection
        },
    };
    return axios.get(`${API_BASE_URL}${API_VERSION}/records`, config);
};

const operationApi = (args: object[] | undefined, operationType: string) => {
    const data = {
        arguments: args,
        operationType
    };

    return axios.post(`${API_BASE_URL}${API_VERSION}/operations`, data);
};

export { loginApi, userBalanceApi, deleteRecordApi, getRecordsApi, operationApi };