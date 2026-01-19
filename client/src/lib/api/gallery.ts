import api from "./axios";

export const getGalleryItems = async () => {
    const response = await api.get("/pasta");
    return response.data;
};

// export const addGalleryItem = async (item) => {
//     const response = await api.post("/gallery", item);
//     return response.data;
// };
