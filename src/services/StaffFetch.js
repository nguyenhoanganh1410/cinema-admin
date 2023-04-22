import promotionApi from "../api/promotionApi";
import staffApi from "../api/staffApi";
import statitisApi from "../api/statitisApi";

export const featchStaffByIdCinema = async (data) =>{
    try {
        const dataResult = await staffApi.getStaffsByIdCinema(data)
        console.log(dataResult);
        return dataResult
    } catch (error) {
        console.log("fetch failed!!", error);
        throw error;
    }
   
}