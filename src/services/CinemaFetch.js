import cinameApi from "../api/cinemaApi";
import promotionApi from "../api/promotionApi";
export const getCinemas = async () =>{
    try {
        const dataResult = await cinameApi.getCinemas()
        return dataResult
    } catch (error) {
        console.log("fetch failed!!", error);
        
        throw error;
    }
   
}