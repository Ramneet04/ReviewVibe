import { useLocation, useNavigate } from 'react-router-dom';

const SentimentResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sentiment, reason } = location.state || {};

  if (!sentiment) return <p>No data to show. Submit a review first.</p>;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="bg-slate-100 border border-slate-300 rounded-2xl p-8 shadow-lg text-center max-w-md w-full">
        <h2 className="text-3xl font-bold mb-4 text-slate-800">Review Analysis</h2>
        <p className="text-xl mb-2">
          <span className="font-semibold">Sentiment:</span>{' '}
          <span className={
            sentiment === 'Positive' ? 'text-green-600' :
            sentiment === 'Negative' ? 'text-red-600' :
            'text-yellow-600'
          }>
            {sentiment}
          </span>
        </p>
        <p className="text-slate-700 italic mb-6">"{reason}"</p>

        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
        >
          Back to Reviews
        </button>
      </div>
    </div>
  );
};

export default SentimentResult;
