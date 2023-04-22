import promotionApi from "../api/promotionApi";
import statitisApi from "../api/statitisApi";

export const fetchRevenue = async (data) =>{
    try {
        const dataResult = await statitisApi.getRevenue(data)
        console.log(dataResult);
        return dataResult
    } catch (error) {
        console.log("fetch failed!!", error);
        
        throw error;
    }
   
}