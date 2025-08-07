
import axios from "axios";
import { API_BASE_URL, API_PATH_DROPS } from "@CONSTANTS/api";
import { DropApi } from "@TYPES/index";

export interface DropClient {
    getDropHistory: (region: string) => Promise<DropApi.DropHistory>;
    getProductList: (region: string) => Promise<DropApi.ProductList>;
}

const createDropClient = (): DropClient => {
    const client = axios.create({
        baseURL: API_BASE_URL,
        headers: {},
    });

    const getDropHistory = async (region: string) => {
        const response = await client.get(`${API_PATH_DROPS}?countries=${region}`);
        return response.data;
    };

    const getProductList = async (region: string) => {
        const response = await client.get(`/products?countries=${region}`);
        return response.data;
    }

    return {
        getDropHistory,
        getProductList,
    };
};

export default createDropClient;