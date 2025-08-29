import requestAxios from "../api/requestAxios";

export const getProducts = async () => {
    try {
        const response = await requestAxios.get(`api/products`);
        
        return response;
    } catch (error) {
        throw error;
    }
}