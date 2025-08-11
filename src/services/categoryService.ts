import requestAxios from "../api/requestAxios";

export const getCategories = async () => {
    try {
        const response = await requestAxios.get(`api/categories`);
        return response;
    } catch (error) {
        throw error;
    }
}