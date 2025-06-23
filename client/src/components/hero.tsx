import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, ThumbsDown, Meh, TrendingUp, Users, MessageSquare } from 'lucide-react';

const MovieReviewApp = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      rating: 5,
      review: "Absolutely incredible! The cinematography was breathtaking and the story kept me engaged throughout. Best movie I've seen all year!",
      sentiment: "positive",
      confidence: 0.95,
      timestamp: new Date('2024-06-20')
    },
    {
      id: 2,
      name: "Sarah Chen",
      rating: 2,
      review: "Really disappointed. The plot was confusing and the pacing was terrible. Expected much more from this director.",
      sentiment: "negative",
      confidence: 0.87,
      timestamp: new Date('2024-06-19')
    },
    {
      id: 3,
      name: "Mike Rodriguez",
      rating: 3,
      review: "It was okay, nothing special. Some good moments but overall pretty average. Might be worth watching once.",
      sentiment: "neutral",
      confidence: 0.72,
      timestamp: new Date('2024-06-18')
    }
  ]);

  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    review: ''
  });

  // Simple sentiment analysis function
  const analyzeSentiment = (text) => {
    const positiveWords = ['amazing', 'incredible', 'fantastic', 'excellent', 'brilliant', 'outstanding', 'wonderful', 'perfect', 'loved', 'great', 'awesome', 'beautiful', 'stunning', 'masterpiece', 'phenomenal'];
    const negativeWords = ['terrible', 'awful', 'horrible', 'disappointing', 'boring', 'worst', 'hate', 'disgusting', 'pathetic', 'useless', 'garbage', 'annoying', 'confusing', 'waste'];
    
    const words = text.toLowerCase().split(/\W+/);
    let positiveScore = 0;
    let negativeScore = 0;
    
    words.forEach(word => {
      if (positiveWords.includes(word)) positiveScore++;
      if (negativeWords.includes(word)) negativeScore++;
    });
    
    const totalScore = positiveScore - negativeScore;
    let sentiment, confidence;
    
    if (totalScore > 0) {
      sentiment = 'positive';
      confidence = Math.min(0.6 + (totalScore * 0.1), 0.98);
    } else if (totalScore < 0) {
      sentiment = 'negative';
      confidence = Math.min(0.6 + (Math.abs(totalScore) * 0.1), 0.98);
    } else {
      sentiment = 'neutral';
      confidence = 0.5 + Math.random() * 0.3;
    }
    
    return { sentiment, confidence };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.review.trim()) return;
    
    const sentimentData = analyzeSentiment(newReview.review);
    
    const review = {
      id: reviews.length + 1,
      name: newReview.name,
      rating: newReview.rating,
      review: newReview.review,
      sentiment: sentimentData.sentiment,
      confidence: sentimentData.confidence,
      timestamp: new Date()
    };
    
    setReviews([review, ...reviews]);
    setNewReview({ name: '', rating: 5, review: '' });
  };

  const getSentimentStats = () => {
    const total = reviews.length;
    const positive = reviews.filter(r => r.sentiment === 'positive').length;
    const negative = reviews.filter(r => r.sentiment === 'negative').length;
    const neutral = reviews.filter(r => r.sentiment === 'neutral').length;
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / total;
    
    return { total, positive, negative, neutral, avgRating };
  };

  const stats = getSentimentStats();

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-50';
      case 'negative': return 'text-red-600 bg-red-50';
      default: return 'text-yellow-600 bg-yellow-50';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive': return <ThumbsUp className="w-4 h-4" />;
      case 'negative': return <ThumbsDown className="w-4 h-4" />;
      default: return <Meh className="w-4 h-4" />;
    }
  };

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
                    <span className="text-2xl font-bold text-slate-800">{stats.total}</span>
                  </div>
                  <p className="text-slate-600 text-sm">Total Reviews</p>
                </div>
                
                <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span className="text-2xl font-bold text-slate-800">{stats.avgRating.toFixed(1)}</span>
                  </div>
                  <p className="text-slate-600 text-sm">Avg Rating</p>
                </div>
                
                <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
                  <div className="flex items-center justify-center mb-2">
                    <ThumbsUp className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-2xl font-bold text-slate-800">{stats.positive}</span>
                  </div>
                  <p className="text-slate-600 text-sm">Positive</p>
                </div>
                
                <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-2xl font-bold text-slate-800">
                      {((stats.positive / stats.total) * 100).toFixed(0)}%
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
                        style={{ width: `${(stats.positive / stats.total) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-slate-700 text-sm w-8">{stats.positive}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-600 w-16 text-sm">Neutral</span>
                    <div className="flex-1 bg-slate-200 rounded-full h-2 mx-3">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(stats.neutral / stats.total) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-slate-700 text-sm w-8">{stats.neutral}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-red-600 w-16 text-sm">Negative</span>
                    <div className="flex-1 bg-slate-200 rounded-full h-2 mx-3">
                      <div 
                        className="bg-red-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(stats.negative / stats.total) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-slate-700 text-sm w-8">{stats.negative}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Review Form */}
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
                  value={newReview.name}
                  onChange={(e) => setNewReview({...newReview, name: e.target.value})}
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
                value={newReview.review}
                onChange={(e) => setNewReview({...newReview, review: e.target.value})}
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

        {/* Reviews List */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Recent Reviews</h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                  <div className="flex items-center space-x-3 mb-3 sm:mb-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {review.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{review.name}</h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-slate-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-slate-500 text-sm">
                          {review.timestamp.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getSentimentColor(review.sentiment)}`}>
                    {getSentimentIcon(review.sentiment)}
                    <span className="text-sm font-medium capitalize">{review.sentiment}</span>
                    <span className="text-xs opacity-75">
                      ({(review.confidence * 100).toFixed(0)}%)
                    </span>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed">{review.review}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieReviewApp;