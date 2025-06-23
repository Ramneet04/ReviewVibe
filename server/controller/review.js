const Review = require("../model/review");
const SentimateAnalyzer = require("../utils/sentimateAnalyses");

exports.submitReview = async(req,res)=>{
    try {
        const {userName, rating, reviewText} = req.body;
        if(!reviewText){
            return res.status(400).json({
                message: "Please enter a review",
                success: false,
            })
        }
        const movieName = "Mission: Impossible – The Final Reckoning";
        const response = await SentimateAnalyzer({movieName, rating, reviewText});
    
        const newReview = new Review({
            userName,
            movieName,
            rating,
            reviewText,
            sentiment: response.sentiment,
            reason: response.reason,
        });
        const savedReview = await newReview.save();
        return res.status(200).json({
            message: "Review submitted successfully",
            success: true,
            review: savedReview
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to submit review",
            success: false,
        });
    }
}

exports.getRecentReviews = async (req,res) =>{
    try {
        const recentReviews = await Review.find().
        sort({
            createdAt: -1
        }).
        limit(3);
        const totalReviews = await Review.countDocuments();
        const positiveCount = await Review.countDocuments({
            sentiment: "Positive"
        });
        const negativeCount = await Review.countDocuments({
            sentiment: "Negative"
        });
        const neutralCount = await Review.countDocuments({
            sentiment: "Neutral"
        });
        let positivePercent=0;
        if(totalReviews>0){
            positivePercent=positiveCount/totalReviews * 100;
        }
        let negativePercent=0;
        if(totalReviews>0){
            negativePercent=negativeCount/totalReviews * 100;
        }
        let neutralPercent=0;
        if(totalReviews>0){
            neutralPercent=neutralCount/totalReviews * 100;
        }

        const average = await Review.aggregate([
            {
                $match: {
                    rating: {
                        $ne:null
                    }
                }
            },
            {
                $group:{
                _id:null,
                avgRating: {$avg: "$rating"}
            }
            }
        ]);
        const averageRating = average[0]?.avgRating || 0;
        return res.status(200).json({
            message: "Recent reviews retrieved successfully",
            success: true,
            reviews:{
                recentReviews,
                totalReviews,
                positiveCount,
                averageRating,
                positivePercent,
                neutralCount,
                negativeCount
            }
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to retrieve recent reviews",
            success: false
        });
    }
}