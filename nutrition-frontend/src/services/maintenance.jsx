import api from "./api";

//post: maintenance calories

export const getMaintenanceCalories = async (data) => {
    const response = await api.post(
        "/maintenance/maintenance_calories_details", data
    );
    return response.data;
};
