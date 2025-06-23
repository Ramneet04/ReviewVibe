import { apiConnector } from "../apiConnector";
import {reviewEndpoints} from '../api'

export const getRecentReviews = async()=>{
    let result =[];
    try {
        const response = await apiConnector("GET", reviewEndpoints.getRecentReviewsapi); 
        if(response?.data?.success){
            result = response.data.reviews;
        }
    } catch (error) {
        console.log("can't fetch data....", error);
    }
    return result;
};

export const submitReview = async (data)=>{
    let result ={};
    try {
         const response = await apiConnector("POST", reviewEndpoints.submitReviewapi, data); 
         if(response?.data?.success){
            result = response.data.review;
         }
    } catch (error) {
        console.log("can't fetch data....", error);
    }
    return result;
}