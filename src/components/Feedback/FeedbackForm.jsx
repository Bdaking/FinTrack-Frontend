import React, { useState, useMemo } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { FaStar } from "react-icons/fa";
import { toast } from "react-hot-toast";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  // Memoizing stars prevents unnecessary re-renders during typing
  const stars = useMemo(() => [...Array(5)], []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return toast.error("Please select a rating!");

    setLoading(true);

    // We use a promise toast for better UX (shows loading -> success/error automatically)
    const feedbackPromise = axiosInstance.post(API_PATHS.FEEDBACK.SUBMIT, {
      rating,
      comment,
    });

    toast.promise(feedbackPromise, {
      loading: "Sending your thoughts...",
      success: () => {
        setRating(0);
        setComment("");
        setLoading(false);
        return <b>Feedback sent! Thank you.</b>;
      },
      error: () => {
        setLoading(false);
        return <b>Could not send feedback.</b>;
      },
    });
  };

  return (
    <div className="group relative bg-white/90 backdrop-blur-xl p-6 sm:p-10 rounded-[2.5rem] border border-white shadow-2xl shadow-purple-500/10 mt-8 mx-auto w-[95%] max-w-lg transition-all duration-500">
      {/* Dynamic Background Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-200/40 rounded-full blur-3xl group-hover:bg-purple-300/60 transition-colors duration-700" />

      <div className="relative z-10">
        <header className="text-center sm:text-left mb-8">
          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Rate Spendora
          </h3>
          <p className="text-sm font-semibold text-gray-400 mt-1">
            How are we doing?
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Rating Engine */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex gap-4 sm:gap-4">
              {stars.map((_, i) => {
                const val = i + 1;
                const active = val <= (hover || rating);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRating(val)}
                    onMouseEnter={() => setHover(val)}
                    onMouseLeave={() => setHover(0)}
                    className="relative transition-transform duration-200 hover:scale-125 active:scale-90 focus:outline-none"
                    aria-label={`Rate ${val} stars`}
                  >
                    <FaStar
                      className={`transition-colors duration-300 ${
                        active
                          ? "text-purple-600 drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]"
                          : "text-gray-200"
                      }`}
                      size={window.innerWidth < 640 ? 36 : 30}
                    />
                  </button>
                );
              })}
            </div>

            {/* Contextual Label - Feels faster because it gives instant feedback */}
            <div className="h-6 mt-3">
              {rating > 0 && (
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-purple-600 animate-in fade-in slide-in-from-bottom-1">
                  {["Poor", "Fair", "Good", "Great", "Amazing!"][rating - 1]}
                </span>
              )}
            </div>
          </div>

          <div className="group/input relative">
            <textarea
              className="w-full bg-gray-50/80 border-2 border-transparent rounded-3xl p-5 text-base focus:bg-white focus:border-purple-500/20 focus:outline-none focus:ring-8 focus:ring-purple-500/5 transition-all duration-300 placeholder:text-gray-300 resize-none"
              placeholder="Your message..."
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white py-5 rounded-3xl text-sm font-black uppercase tracking-widest hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/30 active:scale-[0.97] transition-all duration-300 disabled:opacity-50 disabled:grayscale"
          >
            {loading ? "Processing..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
