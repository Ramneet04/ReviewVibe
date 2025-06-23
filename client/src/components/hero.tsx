import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { Star, ThumbsUp, ThumbsDown, Meh, TrendingUp, Users, MessageSquare } from 'lucide-react';
import { getRecentReviews, submitReview } from '../services/operations/reviews';

const MovieReviewApp = () => {

  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({
  totalReviews: 0,
  positiveCount: 0,
  averageRating: 0,
  positivePercent: 0,
  negativeCount:0,
  neutralCount:0
});
  const [loading, setLoading] = useState(true);
  const [newReview,setNewReview] = useState({
    userName:"",
    rating:5,
    reviewText:""
  });
  useEffect(()=>{
    const fetchReviews = async ()=>{
      try {
        const response= await getRecentReviews();
        setReviews(response.recentReviews);
        setStats({
          totalReviews: response.totalReviews,
          positiveCount: response.positiveCount,
          averageRating: response.averageRating,
          positivePercent: response.positivePercent,
          negativeCount:response.negativeCount,
          neutralCount:response.neutralCount
        });
        console.log(response.recentReviews);
      } catch (error) {
        console.log("error while fetching reviews");
      }
      setLoading(false);
    }
    fetchReviews();
  },[])
  useEffect(() => {
  if (reviews.length > 0) {
    console.log("Updated reviews:", reviews);
  }
}, [reviews]);
const handleSubmit = async (e)=>{
  e.preventDefault();
  const newReviewData = {
    userName: newReview.userName,
    rating: newReview.rating,
    reviewText: newReview.reviewText
  };
  try {
    const response = await submitReview(newReviewData);
    setNewReview({
    userName:"",
    rating:5,
    reviewText:""
  });
    navigate('/result', {
      state: {
        sentiment: response?.sentiment,
        reason: response?.reason
      }
    });
  } catch (error) {
     console.error("Failed to submit review:", error);
  }
}
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">

        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-slate-800 mb-4">
            Mission: Impossible – The Final Reckoning
          </h1>
          <p className="text-xl text-slate-600 mb-6">Share your thoughts and see what others think</p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 mb-8 shadow-lg">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3">
              <div className="bg-slate-100 border border-slate-200 rounded-2xl p-6 text-center shadow-sm">
                <div className="w-full h-64 rounded-xl mb-4 flex items-center justify-center shadow-md">
                  <img  className=" w-full h-full" src="https://res.cloudinary.com/ddlepk8lb/image/upload/v1750691161/missionimpossible_ens1ul.webp" alt=""/>
                </div>
                <p className="text-slate-600 text-sm">2025 ‧ Action/Thriller</p>
              </div>
            </div>
            
            <div className="lg:w-2/3">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-2xl font-bold text-slate-800">{stats.totalReviews}</span>
                  </div>
                  <p className="text-slate-600 text-sm">Total Reviews</p>
                </div>
                
                <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span className="text-2xl font-bold text-slate-800">{stats.averageRating.toFixed(1)}</span>
                  </div>
                  <p className="text-slate-600 text-sm">Avg Rating</p>
                </div>
                
                <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
                  <div className="flex items-center justify-center mb-2">
                    <ThumbsUp className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-2xl font-bold text-slate-800">{stats.positiveCount}</span>
                  </div>
                  <p className="text-slate-600 text-sm">Positive</p>
                </div>
                
                <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-2xl font-bold text-slate-800">
                      {stats.positivePercent.toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm">Positive Rate</p>
                </div>
              </div>

              {/* Sentiment Distribution */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Sentiment Distribution</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-green-600 w-16 text-sm">Positive</span>
                    <div className="flex-1 bg-slate-200 rounded-full h-2 mx-3">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${stats.positivePercent}%` }}
                      ></div>
                    </div>
                    <span className="text-slate-700 text-sm w-8">{stats.positiveCount}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-600 w-16 text-sm">Neutral</span>
                    <div className="flex-1 bg-slate-200 rounded-full h-2 mx-3">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(stats.neutralCount/stats.totalReviews)*100}%` }}
                      ></div>
                    </div>
                    <span className="text-slate-700 text-sm w-8">{stats.neutralCount}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-red-600 w-16 text-sm">Negative</span>
                    <div className="flex-1 bg-slate-200 rounded-full h-2 mx-3">
                      <div 
                        className="bg-red-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(stats.negativeCount/stats.totalReviews)*100}%` }}
                      ></div>
                    </div>
                    <span className="text-slate-700 text-sm w-8">{stats.negativeCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
            <MessageSquare className="w-6 h-6 mr-3 text-blue-600" />
            Write a Review
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-slate-700 text-sm font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  value={newReview.userName}
                  onChange={(e) => setNewReview({...newReview, userName: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-700 text-sm font-medium mb-2">Rating</label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                >
                  {[5,4,3,2,1].map(num => (
                    <option key={num} value={num} className="bg-white">
                      {num} Star{num !== 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-slate-700 text-sm font-medium mb-2">Your Review</label>
              <textarea
                value={newReview.reviewText}
                onChange={(e) => setNewReview({...newReview, reviewText: e.target.value})}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none shadow-sm"
                rows="4"
                placeholder="Share your thoughts about the movie..."
                required
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
            >
              Submit Review
            </button>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Recent Reviews</h2>
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                  <div className="flex items-center space-x-3 mb-3 sm:mb-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {review?.userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{review.userName}</h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < review?.rating ? 'text-yellow-500 fill-current' : 'text-slate-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-slate-500 text-sm">
                           {new Date(review?.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed">{review?.reviewText}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieReviewApp;