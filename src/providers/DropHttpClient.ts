
import axios from "axios";
import { API_BASE_URL, API_PATH_DROPS } from "@CONSTANTS/api";
import { DropApi } from "@TYPES/index";

export interface DropClient {
    getDropHistory: () => Promise<DropApi.DropHistory>;
}

const createDropClient = (): DropClient => {
    const client = axios.create({
        baseURL: API_BASE_URL,
        headers: {},
    });

    const getDropHistory = async () => {
        const response = await client.get(API_PATH_DROPS);
        return response.data;
    };

    return {
        getDropHistory,
    };
};

export default createDropClient;